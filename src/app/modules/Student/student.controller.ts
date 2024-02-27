import { Request, Response } from 'express'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StudentServices } from './student.service'

const getAllStudentsController = catchAsync(
  async (req: Request, res: Response) => {
    // get query
    const query = req.query
    const result = await StudentServices.getAllStudentsService(query)
    // check is data exist or not found
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'sorry, data not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    })
  },
)

//-- controller to get single student
const getSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.studentId
    const result = await StudentServices.getSingleStudentService(id)
    // check is data exist or not found
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'sorry, data not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    })
  },
)

//-- controller to update single student
const updateSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    // get student id from params
    const id = req.params.studentId
    // get student data from body
    const { student } = req.body
    // call update service
    const result = await StudentServices.updateSingleStudentService(id, student)
    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student updated successfully',
      data: result,
    })
  },
)

//-- controller to delete single student
const deleteSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.studentId
    const result = await StudentServices.deleteSingleStudentService(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    })
  },
)

//-- controller to aggregate
const aggregateController = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentServices.aggregateService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
})

export const StudentControllers = {
  // createNewStudentController,
  getAllStudentsController,
  getSingleStudentController,
  updateSingleStudentController,
  deleteSingleStudentController,
  aggregateController,
}
