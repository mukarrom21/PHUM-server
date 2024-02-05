import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createNewUserController = catchAsync(async (req, res) => {
  const result = await UserServices.createNewUserService(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
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
  createNewUserController,
  getMultipleUsersController,
  getSingleUserController,
  updateSingleUserController,
  deleteSingleUserController,
  deleteMultipleUsersController,
  updateMultipleUsersController,
}
