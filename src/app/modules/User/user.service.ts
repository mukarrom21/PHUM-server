/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { TAcademicSemester } from '../AcademicSemester/academicSemester.interface'
import { AcademicSemesterModel } from '../AcademicSemester/academicSemester.model'
import { TAdmin } from '../Admin/admin.interface'
import { AdminModel } from '../Admin/admin.model'
import { TFaculty } from '../Faculty/faculty.interface'
import { FacultyModel } from '../Faculty/faculty.model'
import { TStudent } from '../Student/student.interface'
import { StudentModel } from '../Student/student.model'
import { USER_ROLE } from './user.constant'
import { TUser } from './user.interface'
import { UserModel } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'

// service to create new student
const createNewStudentService = async (password: string, payload: TStudent) => {
  // create user object
  const userData: Partial<TUser> = {}

  // set given password or default password
  userData.password = password || (config.default_password as string)

  // set student role
  userData.role = USER_ROLE.student

  // To generate student id find academic semester by id for semester year and code
  const academicSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  )

  // --------start transaction and rollback-------
  // start session
  const session = await mongoose.startSession()

  try {
    session.startTransaction() // start transaction

    // set generated student id
    userData.id = await generateStudentId(academicSemester as TAcademicSemester)

    // create a user -> transaction : 1
    const newUser = await UserModel.create([userData], { session }) // array

    // if can not create user throw error
    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sorry, Failed to create new user!',
      )
    }

    // create a student -> transaction : 2
    // set id, _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newStudent = await StudentModel.create([payload], { session })

    // if can not create student throw error
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sorry, Failed to create new student!',
      )
    }

    // If data created success commit session transaction and end the session
    await session.commitTransaction()
    await session.endSession()

    // return
    return newStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

// service to create new faculty
const createNewFacultyService = async (password: string, payload: TFaculty) => {
  // create user object
  const userData: Partial<TUser> = {}

  // set given password or default password
  userData.password = password || (config.default_password as string)

  // set student role
  userData.role = USER_ROLE.faculty

  // // To generate student id find academic semester by id for semester year and code
  // const academicSemester = await AcademicSemesterModel.findById(
  //   payload.admissionSemester,
  // )

  // --------start transaction and rollback-------
  // start session
  const session = await mongoose.startSession()

  try {
    session.startTransaction() // start transaction

    // set generated student id
    userData.id = await generateFacultyId()

    // create a user -> transaction : 1
    const newUser = await UserModel.create([userData], { session }) // array

    // if can not create user throw error
    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sorry, Failed to create new user!',
      )
    }

    // create a Faculty -> transaction : 2
    // set id, _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newFaculty = await FacultyModel.create([payload], { session })

    // if can not create student throw error
    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sorry, Failed to create new faculty!',
      )
    }

    // If data created success commit session transaction and end the session
    await session.commitTransaction()
    await session.endSession()

    // return
    return newFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

// service to create new Admin
const createNewAdminService = async (password: string, payload: TAdmin) => {
  // create user object
  const userData: Partial<TUser> = {}

  // set given password or default password
  userData.password = password || (config.default_password as string)

  // set student role
  userData.role = USER_ROLE.admin

  // --------start transaction and rollback-------
  // start session
  const session = await mongoose.startSession()

  try {
    session.startTransaction() // start transaction

    // set generated student id
    userData.id = await generateAdminId()

    // create a user -> transaction : 1
    const newUser = await UserModel.create([userData], { session }) // array

    // if can not create user throw error
    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sorry, Failed to create new user!',
      )
    }

    // create a admin -> transaction : 2
    // set id, _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newAdmin = await AdminModel.create([payload], { session })

    // if can not create admin throw error
    if (!newAdmin.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Sorry, Failed to create new admin!',
      )
    }

    // If data created success commit session transaction and end the session
    await session.commitTransaction()
    await session.endSession()

    // return
    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const findMultipleUsersService = async () => {
  const result = await UserModel.find()
  return result
}

const findSingleUserService = async () => {}
const updateSingleUserService = async () => {}
const deleteSingleUserService = async () => {}
const updateMultipleUsersService = async () => {}
const deleteMultipleUsersService = async () => {}

export const UserServices = {
  createNewStudentService,
  createNewFacultyService,
  createNewAdminService,
  findMultipleUsersService,
  findSingleUserService,
  updateSingleUserService,
  deleteSingleUserService,
  updateMultipleUsersService,
  deleteMultipleUsersService,
}
