/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { CourseModel } from '../Course/course.model'
import { FacultyModel } from '../Faculty/faculty.model'
import { OfferedCourseModel } from '../OfferedCourse/offeredCourse.model'
import { SemesterRegistrationModel } from '../SemesterRegistration/semesterRegistration.model'
import { StudentModel } from '../Student/student.model'
import { TEnrolledCourse } from './enrolledCourse.interface'
import { EnrolledCourseModel } from './enrolledCourse.model'
import { calculateGradeAndPoints } from './enrolledCourse.utils'

const createEnrolledCourseService = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /**
   * step 1: check is the offered course exists
   * step 2: check if the student is already enrolled
   * step 3: check if the max credits exceed
   * step 4: create an enrolled course
   */
  // check is the offered course exists
  const offeredCourse = await OfferedCourseModel.findById(payload.offeredCourse)

  // if not exists throw error
  if (!offeredCourse) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Sorry, Offered course is not exists!',
    )
  }

  // find student ObjectID
  const studentId = await StudentModel.findOne({ id: userId }, { _id: 1 })

  // check if the student is already enrolled
  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    student: studentId?._id,
    semesterRegistration: offeredCourse?.semesterRegistration,
    offeredCourse: payload.offeredCourse,
  })
  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Sorry, this student is already enrolled!',
    )
  }

  // check if the capacity ends
  if (offeredCourse.maxCapacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Sorry, course room is fulfilled!',
    )
  }

  // current credits
  const course = await await CourseModel.findById(offeredCourse.course)

  // check total credits exceeds maxCredit
  const semesterRegistration = await SemesterRegistrationModel.findById(
    offeredCourse.semesterRegistration,
  ).select('maxCredit')

  const enrolledCourse = await EnrolledCourseModel.aggregate([
    // stage 1: match semester registration and student id
    {
      $match: {
        semesterRegistration: offeredCourse.semesterRegistration,
        student: studentId?._id,
      },
    },
    // stage 2: lookup
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCoursesData',
      },
    },
    // stage 3: unwind
    {
      $unwind: '$enrolledCoursesData',
    },
    // stage 4: group for get total max credits
    {
      $group: {
        _id: null,
        totalCredits: { $sum: '$enrolledCoursesData.credits' },
      },
    },
    // project
    {
      $project: {
        _id: 0,
      },
    },
  ])

  // total enrolled credits + new enrolled course credit > maxCredit
  const totalCredits =
    enrolledCourse.length > 0 ? enrolledCourse[0].totalCredits : 0

  if (
    totalCredits &&
    semesterRegistration?.maxCredit &&
    totalCredits + course?.credits > semesterRegistration?.maxCredit
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Sorry, you have exceeded maximum number of credits!',
    )
  }

  // start session
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const result = await EnrolledCourseModel.create(
      [
        {
          semesterRegistration: offeredCourse.semesterRegistration,
          academicSemester: offeredCourse.academicSemester,
          academicFaculty: offeredCourse.academicFaculty,
          academicDepartment: offeredCourse.academicDepartment,
          offeredCourse: payload.offeredCourse,
          course: offeredCourse.course,
          student: studentId?._id,
          faculty: offeredCourse.faculty,
          isEnrolled: true,
        },
      ],
      { session },
    )

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sorry, failed to enroll in this course!',
      )
    }

    // reduce max capacity
    const maxCapacity = offeredCourse.maxCapacity
    await OfferedCourseModel.findByIdAndUpdate(payload.offeredCourse, {
      maxCapacity: maxCapacity - 1,
    })

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(error)
  }
}

const updateEnrolledCourseMarksService = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  // destructure payload
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload

  // check is semester registration exists
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration)
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !',
    )
  }

  // check is offered course exists
  const isOfferedCourseExists = await OfferedCourseModel.findById(offeredCourse)
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !')
  }

  // check is student exists
  const isStudentExists = await StudentModel.findById(student)
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  // check is faculty exists
  const isFacultyExists = await FacultyModel.findOne({ id: facultyId })
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  // check is course belong to faculty
  const isCourseBelongToFaculty = await EnrolledCourseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: isFacultyExists._id,
  })
  if (!isCourseBelongToFaculty) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This course is not belong to Faculty!',
    )
  }

  // update operation
  const modifiedData: Record<string, unknown> = { ...courseMarks }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value
    }
  }

  // calculate total marks and add grad and points
  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2, finalTerm } =
      isCourseBelongToFaculty.courseMarks

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5)

    const result = calculateGradeAndPoints(totalMarks)

    modifiedData.grade = result.grade
    modifiedData.gradePoints = result.gradePoints
    modifiedData.isCompleted = true
  }

  const result = await EnrolledCourseModel.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    { new: true },
  )

  return result
}

export const EnrolledCourseServices = {
  createEnrolledCourseService,
  updateEnrolledCourseMarksService,
}
