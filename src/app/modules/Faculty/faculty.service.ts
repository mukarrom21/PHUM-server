import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { UserModel } from '../User/user.model'
import { facultySearchableFields } from './faculty.constant'
import { TFaculty } from './faculty.interface'
import { FacultyModel } from './faculty.model'

//-- service to get all Faculties with query builder
const getAllFacultiesService = async (query: Record<string, unknown>) => {
  // create instance of QueryBuilder class with all methods
  const FacultyQuery = new QueryBuilder(
    FacultyModel.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  // use modelQuery and resolve
  const result = await FacultyQuery.modelQuery

  return result
}
//-- service to get single Faculty by Faculty-id
const getSingleFacultyService = async (id: string) => {
  const result = await FacultyModel.findOne({ id }).populate({
    path: 'academicDepartment',
    populate: { path: 'academicFaculty' },
  })
  return result
}

//-- service to update single Faculty by Faculty-id
const updateSingleFacultyService = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...restData } = payload // extract payload
  // create an empty object it will contain all data like permeative data
  const updatableData: Record<string, unknown> = { ...restData }

  /**
   * check is name exists. if exists convert to updatable data
   *   name: {
   *    firstName: 'abul'
   *   }
   * convert this object to : "name.firstName"="abul"
   */
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatableData[`name.${key}`] = value
    }
  }

  const result = await FacultyModel.findOneAndUpdate({ id }, updatableData, {
    new: true,
    runValidators: true,
  })
  return result
}

//-- service to delete single Faculty by Faculty-id
const deleteSingleFacultyService = async (id: string) => {
  // start transaction and roleback
  // start session
  const session = await mongoose.startSession()
  try {
    // start transaction
    session.startTransaction()
    // delete user
    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    // check is user deleted or not
    if (!deletedUser?.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }
    // delete Faculty
    const deletedFaculty = await FacultyModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedFaculty?.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty')
    }
    // commit transaction
    await session.commitTransaction()
    await session.endSession()
    return deletedFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

//-- service to aggregate
const aggregateService = async () => {
  const result = await FacultyModel.aggregate([{ $match: {} }])
  return result
}

export const FacultyServices = {
  // createNewFacultyService,
  getAllFacultiesService,
  getSingleFacultyService,
  updateSingleFacultyService,
  deleteSingleFacultyService,
  aggregateService,
}
