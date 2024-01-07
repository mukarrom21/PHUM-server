import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TestServices } from './test.service'

// controller for creating test
const createTestController = catchAsync(async (req, res) => {
  // get the payload
  const payload = req.body
  // create a test
  const result = await TestServices.createTestService(payload)
  // send the response
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Test created successfully',
    data: result,
  })
})

// controller for getting all tests
const getAllTestsController = catchAsync(async (req, res) => {
  // get all tests
  const result = await TestServices.getAllTestsService()
  // send the response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All tests fetched successfully',
    data: result,
  })
})

// controller for getting a single test
const getSingleTestController = catchAsync(async (req, res) => {
  // get the id
  const id = req.params.id
  // get the test
  const result = await TestServices.getSingleTestService(id)
  // send the response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test fetched successfully',
    data: result,
  })
})

// controller for updating a test
const updateTestController = catchAsync(async (req, res) => {
  // get the id
  const id = req.params.id
  // get the payload
  const payload = req.body
  // update the test
  const result = await TestServices.updateTestService(id, payload)
  // send the response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test updated successfully',
    data: result,
  })
})

// controller for deleting a test
const deleteTestController = catchAsync(async (req, res) => {
  // get the id
  const id = req.params.id
  // delete the test
  await TestServices.deleteTestService(id)
  // send the response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Test deleted successfully',
    data: null,
  })
})

// export the controllers
export const TestControllers = {
  createTestController,
  getAllTestsController,
  getSingleTestController,
  updateTestController,
  deleteTestController,
}
