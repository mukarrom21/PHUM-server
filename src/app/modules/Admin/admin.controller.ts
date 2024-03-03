import { Request, Response } from 'express'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AdminServices } from './admin.service'

const getAllAdminsController = catchAsync(
  async (req: Request, res: Response) => {
    // get query
    const query = req.query
    const result = await AdminServices.getAllAdminsService(query)
    // check is data exist or not found
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'sorry, data not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admins retrieved successfully',
      data: result,
    })
  },
)

//-- controller to get single admin
const getSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.adminId
    const result = await AdminServices.getSingleAdminService(id)
    // check is data exist or not found
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, 'sorry, data not found')
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully',
      data: result,
    })
  },
)

//-- controller to update single admin
const updateSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    // get Faculty id from params
    const id = req.params.adminId
    // get Faculty data from body
    const { Faculty } = req.body
    // call update service
    const result = await AdminServices.updateSingleAdminService(id, Faculty)
    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully',
      data: result,
    })
  },
)

//-- controller to delete single Faculty
const deleteSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.adminId
    const result = await AdminServices.deleteSingleAdminService(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted successfully',
      data: result,
    })
  },
)

//-- controller to aggregate
const aggregateController = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.aggregateService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved with aggregate successfully',
    data: result,
  })
})

export const AdminControllers = {
  getAllAdminsController,
  getSingleAdminController,
  updateSingleAdminController,
  deleteSingleAdminController,
  aggregateController,
}
