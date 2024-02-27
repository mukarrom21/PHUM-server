import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createNewAcademicDepartmentController = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentService(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})

// Controller to find all academic Department
const findAllAcademicDepartmentController = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.findAllAcademicDepartmentService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic Department retrieved successfully',
    data: result,
  })
})

// Controller to find single academic Department by object id
const findSingleAcademicDepartmentByIdController = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.findSingleAcademicDepartmentService(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrieved successfully',
    data: result,
  })
})

// Controller to update single academic Department by object id
const updateSingleAcademicDepartmentByIdController = catchAsync(
  async (req, res) => {
    const result = await AcademicDepartmentServices.updateAcademicDepartmentService(
      req.params.id,
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    })
  },
)

export const AcademicDepartmentControllers = {
  createNewAcademicDepartmentController,
  findAllAcademicDepartmentController,
  findSingleAcademicDepartmentByIdController,
  updateSingleAcademicDepartmentByIdController,
}
