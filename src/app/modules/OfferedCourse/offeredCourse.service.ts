import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AcademicDepartmentModel } from '../AcademicDepartment/academicDepartment.model'
import { CourseModel } from '../Course/course.model'
import { FacultyModel } from '../Faculty/faculty.model'
import { SemesterRegistrationModel } from '../SemesterRegistration/semesterRegistration.model'
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model'
import { TOfferedCourse } from './offeredCourse.interface'
import { OfferedCourseModel } from './offeredCourse.model'
import { hasTimeConflict } from './offeredCourse.utils'

// create new OfferedCourses
const createOfferedCourseService = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload

  /**
   * Step 1: check if the semester registration id is exists!
   * Step 2: check if the academic faculty id is exists!
   * Step 3: check if the academic department id is exists!
   * Step 4: check if the course id is exists!
   * Step 5: check if the faculty id is exists!
   * Step 6: check if the department is belong to the  faculty
   * Step 7: check if the same offered course same section in same registered semester exists
   * Step 8: get the schedules of the faculties
   * Step 9: check if the faculty is available at that time. If not then throw error
   * Step 10: create the offered course
   */
  // step 1: check if the semester registration id is exists!
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(semesterRegistration)
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found!')
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester

  // * Step 2: check if the academic faculty id is exists!
  const isAcademicFacultyExists =
    await AcademicFacultyModel.findById(academicFaculty)
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found!')
  }
  // * Step 3: check if the academic department id is exists!
  const isAcademicDepartmentExists =
    await AcademicDepartmentModel.findById(academicDepartment)
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found!')
  }
  // * Step 4: check if the course id is exists!
  const isCourseExists = await CourseModel.findById(course)
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!')
  }
  // * Step 5: check if the faculty id is exists!
  const isFacultyExists = await FacultyModel.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!')
  }
  // * Step 6: check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartmentModel.findOne({
    _id: academicDepartment,
    academicFaculty,
  })
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists?.name} is not belong to this ${isAcademicFacultyExists?.name}`,
    )
  }
  // * Step 7: check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course,
      section,
    })
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exist!`,
    )
  }
  // * Step 8: get the schedules of the faculties
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = { days, startTime, endTime }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    )
  }

  // * Step 9: check if the faculty is available at that time. If not then throw error
  // * Step 10: create the offered course
  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  })
  return result
}

// service to find all Offered Courses
const getAllOfferedCourseService = async (query: Record<string, unknown>) => {
  // create instance of query builder
  const OfferedCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await OfferedCourseQuery.modelQuery
  return result
}

// service to find single Offered Course by _id
const getSingleOfferedCourseService = async (id: string) => {
  const result = await OfferedCourseModel.findById(id)
  return result
}

// service to update single offered course _id
const updateOfferedCourseService = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  /**
   * Step 1: check if the offered course exists
   * Step 2: check if the faculty exists
   * Step 3: check if the semester registration status is upcoming
   * Step 4: check if the faculty is available at that time. If not then throw error
   * Step 5: update the offered course
   */
  const { faculty, days, startTime, endTime } = payload

  const isOfferedCourseExists = await OfferedCourseModel.findById(id)

  // check is offered course exists or not
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found')
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration

  // check status of the semester registration
  const semesterRegistrationStatus =
    await SemesterRegistrationModel.findById(semesterRegistration)

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update this offered course as it is ${semesterRegistrationStatus?.status}`,
    )
  }

  // check if the faculty is available at this time
  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at that time ! Choose other time or day`,
    )
  }

  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const OfferedCourseServices = {
  createOfferedCourseService,
  getAllOfferedCourseService,
  getSingleOfferedCourseService,
  updateOfferedCourseService,
}
