import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OfferedCourseServices } from './offeredCourse.service'

const createOfferedCourseController = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseService(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  })
})

// Controller to find all academic semester
const getAllOfferedCourseController = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseService(
    req.query,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Offered courses retrieved successfully',
    data: result,
  })
})

// Controller to find single academic semester by object id
const getSingleOfferedCourseController = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getSingleOfferedCourseService(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Offered course retrieved successfully',
    data: result,
  })
})

// Controller to update single academic semester by object id
const updateOfferedCourseController = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.updateOfferedCourseService(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course updated successfully',
    data: result,
  })
})

export const OfferedCourseControllers = {
  createOfferedCourseController,
  getAllOfferedCourseController,
  getSingleOfferedCourseController,
  updateOfferedCourseController,
}
