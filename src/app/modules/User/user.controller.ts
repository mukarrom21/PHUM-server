import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

// controller to create new student
const createNewStudentController = catchAsync(async (req, res) => {
  const image = req.file
  const { password, student } = req.body
  const result = await UserServices.createNewStudentService(
    image,
    password,
    student,
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student create successfully',
    data: result,
  })
})

// controller to create new faculty
const createNewFacultyController = catchAsync(async (req, res) => {
  const image = req.file
  const { password, faculty } = req.body
  const result = await UserServices.createNewFacultyService(
    image,
    password,
    faculty,
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  })
})

// controller to create new admin
const createNewAdminController = catchAsync(async (req, res) => {
  const image = req.file
  // console.log(req.file)
  const { password, admin } = req.body
  const result = await UserServices.createNewAdminService(
    image,
    password,
    admin,
  )
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

// controller to update user status
const updateUserStatusController = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserStatusService(
    req.params.id,
    req.body,
  )
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sorry, user not found')
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User status updated successfully',
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

// get me controller
const getMeController = catchAsync(async (req, res) => {
  const { id, role } = req.user
  const result = await UserServices.getMeUsersService(id, role)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Profile data retrieved successfully',
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
  updateUserStatusController,
  deleteSingleUserController,
  deleteMultipleUsersController,
  updateMultipleUsersController,
  getMeController,
}
