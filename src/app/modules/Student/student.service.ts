import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { UserModel } from '../User/user.model'
import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

// //-- Service to create new student
// const createNewStudentService = async (payload: TStudent) => {
//   // // create an instance
//   // const student = new StudentModel(payload)
//   // check if user already exist than throw new error
//   if (await StudentModel.isUserExists(payload.id)) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Sorry, user is already exists')
//   }

//   const result = await StudentModel.create(payload)
//   return result
// }

//-- service to get all students
const getAllStudentsService = async (query: Record<string, unknown>) => {
  // console.log(query) // { searchTerm: 'a' }
  const filterQueries = { ...query }
  // define exclude queries to exclude properties from filterQueries
  const excludeQueries = ['searchTerm', 'sort', 'page', 'limit', 'fields']
  // delete properties form filterQueries which match with excludeQueries elements
  excludeQueries.forEach(elm => delete filterQueries[elm])

  // fields to search with partial match
  const studentSearchableFields = [
    'id',
    'name.firstName',
    'name.middleName',
    'name.lastName',
    'email',
    'presentAddress',
    'permanentAddress',
    'guardian.fatherName',
    'guardian.motherName',
  ]

  /**
   * @search_query : partial match
   */
  let searchTerm = ''
  if (query.searchTerm) {
    searchTerm = query.searchTerm as string
  }
  const searchQuery = StudentModel.find({
    $or: studentSearchableFields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  // -----------Filtering--------------
  const filterQuery = searchQuery
    .find(filterQueries)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })

  // ----------Sorting---------------
  let sort = '-createdAt'
  if (query.sort) {
    sort = query.sort as string
  }
  const sortQuery = filterQuery.sort(sort)

  // ---------pagination (skip and limit)---------------
  let page = 1
  let limit = 1
  if (query.page) {
    page = Number(query.page)
  }
  if (query.limit) {
    limit = Number(query.limit)
  }
  const skip = (page - 1) * limit
  const paginateQuery = sortQuery.skip(skip).limit(limit)

  // ---------Field limiting---------------
  let fields = '-__v'
  if (query?.fields) {
    fields = (query?.fields as string).split(',').join(' ')
  }
  console.log(fields)
  const fieldsQuery = await paginateQuery.select(fields)

  return fieldsQuery
}

//-- service to get single student by student-id
const getSingleStudentService = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })
  return result
}

//-- service to update single student by student-id
const updateSingleStudentService = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...restData } = payload // extract payload
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

  // check is guardian exists. if exists convert to updatable data
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatableData[`guardian.${key}`] = value
    }
  }

  // check is local guardian exists. if exists convert to updatable data
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updatableData[`localGuardian.${key}`] = value
    }
  }
  const result = await StudentModel.findOneAndUpdate({ id }, updatableData, {
    new: true,
    runValidators: true,
  })
  return result
}

//-- service to delete single student by student-id
const deleteSingleStudentService = async (id: string) => {
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
    // delete student
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!deletedStudent?.isDeleted) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }
    // commit transaction
    await session.commitTransaction()
    await session.endSession()
    return deletedStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

//-- service to aggregate
const aggregateService = async () => {
  const result = await StudentModel.aggregate([{ $match: {} }])
  return result
}

export const StudentServices = {
  // createNewStudentService,
  getAllStudentsService,
  getSingleStudentService,
  updateSingleStudentService,
  deleteSingleStudentService,
  aggregateService,
}
