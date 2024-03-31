import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { TCourse, TCourseFaculties } from './course.interface'
import { CourseFacultiesModel, CourseModel } from './course.model'

// service to create new course
const createNewCourseService = async (payload: TCourse) => {
  const result = await CourseModel.create(payload)
  return result
}

// service to get all courses
const findAllCoursesService = async (query: Record<string, unknown>) => {
  // query builder
  const CourseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(['title', 'prefix']) // code is number and number don't match partial. it is match exact
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await CourseQuery.modelQuery
  return result
}

// service to get single course
const findSingleCourseService = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  )
  return result
}

// service to update course
const updateCourseService = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...restData } = payload

  // we are taking multiple write operation. so use transaction and rollback
  // start session
  const session = await mongoose.startSession()

  // use try catch
  try {
    // start transaction
    session.startTransaction()
    // 1st transaction :

    // check if rest data exists update basic info
    if (restData && Object.keys(restData).length) {
      const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
        id,
        restData,
        {
          new: true,
          runValidators: true,
        },
      )
      if (!updatedBasicCourseInfo) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')
      }
    }

    // check if pre requisite course exists
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filter out deletable pre requisite courses
      const deletAblePreRequisiteCourses = preRequisiteCourses
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course)

      // delete preRequisiteCourses
      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletAblePreRequisiteCourses },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )
      // if failed to delete throw error
      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete preRequisite course',
        )
      }
      // }

      // filter out new courses fields
      const addableNewPreRequisiteCourses = preRequisiteCourses?.filter(
        el => el.course && !el.isDeleted,
      )

      // add new pre requisite courses
      const addedNewPreRequisiteCourse = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: addableNewPreRequisiteCourses },
          },
        },
        { new: true, runValidators: true, session },
      )

      if (!addedNewPreRequisiteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'failed to add new preRequisite courses',
        )
      }
    }

    // commit transaction
    await session.commitTransaction()
    await session.endSession()
    return await CourseModel.findById(id).populate('preRequisiteCourses.course')
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Sorry, Fail to update the course',
    )
  }
}

// service to delete course
const deleteCourseService = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

// service to add new  course faculties
const assignFacultiesIntoCourseService = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFacultiesModel.findByIdAndUpdate(
    id,
    { course: id, $addToSet: { faculties: { $each: payload } } },
    { upsert: true, new: true },
  )
  return result
}

// service to remove faculties from course
const removeFacultiesFromCourseService = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFacultiesModel.findByIdAndUpdate(
    id,
    { $pull: { faculties: { $in: payload } } },
    { new: true },
  )
  return result
}

export const CourseServices = {
  createNewCourseService,
  findAllCoursesService,
  findSingleCourseService,
  updateCourseService,
  deleteCourseService,
  assignFacultiesIntoCourseService,
  removeFacultiesFromCourseService,
}
