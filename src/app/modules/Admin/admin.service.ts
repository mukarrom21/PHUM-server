/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { UserModel } from '../User/user.model'
import { facultySearchableFields } from './admin.constant'
import { TAdmin } from './admin.interface'
import { AdminModel } from './admin.model'

//-- service to get all Faculties with query builder
const getAllAdminsService = async (query: Record<string, unknown>) => {
  // create instance of QueryBuilder class with all methods
  const AdminQuery = new QueryBuilder(AdminModel.find(), query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  // use modelQuery and resolve
  const result = await AdminQuery.modelQuery
  const meta = await AdminQuery.countTotal()

  return { meta, result }
}
//-- service to get single admin by admin-id
const getSingleAdminService = async (id: string) => {
  const result = await AdminModel.findOne({ id })
  return result
}

//-- service to update single admin by admin-id
const updateSingleAdminService = async (
  id: string,
  payload: Partial<TAdmin>,
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

  const result = await AdminModel.findOneAndUpdate({ id }, updatableData, {
    new: true,
    runValidators: true,
  })
  return result
}

//-- service to delete single admin by admin-id
const deleteSingleAdminService = async (id: string) => {
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
    const deletedAdmin = await AdminModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedAdmin?.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin')
    }
    // commit transaction
    await session.commitTransaction()
    await session.endSession()
    return deletedAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

//-- service to aggregate
const aggregateService = async () => {
  const result = await AdminModel.aggregate([{ $match: {} }])
  return result
}

export const AdminServices = {
  getAllAdminsService,
  getSingleAdminService,
  updateSingleAdminService,
  deleteSingleAdminService,
  aggregateService,
}
