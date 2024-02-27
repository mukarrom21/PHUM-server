import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.service'

const createNewAcademicFacultyController = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyService(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})

// Controller to find all academic Faculty
const findAllAcademicFacultyController = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.findAllAcademicFacultyService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic Faculty retrieved successfully',
    data: result,
  })
})

// Controller to find single academic Faculty by object id
const findSingleAcademicFacultyByIdController = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.findSingleAcademicFacultyService(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved successfully',
    data: result,
  })
})

// Controller to update single academic Faculty by object id
const updateSingleAcademicFacultyByIdController = catchAsync(
  async (req, res) => {
    const result = await AcademicFacultyServices.updateAcademicFacultyService(
      req.params.id,
      req.body,
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    })
  },
)

export const AcademicFacultyControllers = {
  createNewAcademicFacultyController,
  findAllAcademicFacultyController,
  findSingleAcademicFacultyByIdController,
  updateSingleAcademicFacultyByIdController,
}
