import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

// controller to create new student
const createNewStudentController = catchAsync(async (req, res) => {
  const { password, student } = req.body
  const result = await UserServices.createNewStudentService(password, student)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student create successfully',
    data: result,
  })
})

// controller to create new faculty
const createNewFacultyController = catchAsync(async (req, res) => {
  const { password, faculty } = req.body
  const result = await UserServices.createNewFacultyService(password, faculty)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

// controller to create new admin
const createNewAdminController = catchAsync(async (req, res) => {
  const { password, admin } = req.body
  const result = await UserServices.createNewAdminService(password, admin)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

const getMultipleUsersController = catchAsync(async (req, res) => {
  const result = await UserServices.findMultipleUsersService()
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const getSingleUserController = catchAsync(async (req, res) => {
  const result = await UserServices.findSingleUserService()
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const updateSingleUserController = catchAsync(async (req, res) => {
  const result = await UserServices.updateSingleUserService()
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const deleteSingleUserController = catchAsync(async (req, res) => {
  const result = await UserServices.deleteSingleUserService()
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const deleteMultipleUsersController = catchAsync(async (req, res) => {
  const result = await UserServices.deleteMultipleUsersService()
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const updateMultipleUsersController = catchAsync(async (req, res) => {
  const result = await UserServices.updateMultipleUsersService()
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const UserControllers = {
  createNewStudentController,
  createNewFacultyController,
  createNewAdminController,
  getMultipleUsersController,
  getSingleUserController,
  updateSingleUserController,
  deleteSingleUserController,
  deleteMultipleUsersController,
  updateMultipleUsersController,
}
