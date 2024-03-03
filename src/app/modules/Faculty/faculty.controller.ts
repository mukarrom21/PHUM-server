import { Request, Response } from 'express'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculty.service'

const getAllFacultiesController = catchAsync(
  async (req: Request, res: Response) => {
    // get query
    const query = req.query
    const result = await FacultyServices.getAllFacultiesService(query)
    // check is data exist or not found
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'sorry, data not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties retrieved successfully',
      data: result,
    })
  },
)

//-- controller to get single Faculty
const getSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.facultyId
    const result = await FacultyServices.getSingleFacultyService(id)
    // check is data exist or not found
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'sorry, data not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieved successfully',
      data: result,
    })
  },
)

//-- controller to update single Faculty
const updateSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    // get Faculty id from params
    const id = req.params.FacultyId
    // get Faculty data from body
    const { Faculty } = req.body
    // call update service
    const result = await FacultyServices.updateSingleFacultyService(id, Faculty)
    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully',
      data: result,
    })
  },
)

//-- controller to delete single Faculty
const deleteSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.FacultyId
    const result = await FacultyServices.deleteSingleFacultyService(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully',
      data: result,
    })
  },
)

//-- controller to aggregate
const aggregateController = catchAsync(async (req: Request, res: Response) => {
  const result = await FacultyServices.aggregateService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved with aggregate successfully',
    data: result,
  })
})

export const FacultyControllers = {
  getAllFacultiesController,
  getSingleFacultyController,
  updateSingleFacultyController,
  deleteSingleFacultyController,
  aggregateController,
}
