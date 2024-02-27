import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createNewAcademicSemesterController = catchAsync(async (req, res) => {
  const result =
    await AcademicSemesterServices.createNewAcademicSemesterService(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  })
})

// Controller to find all academic semester
const findAllAcademicSemesterController = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.findAllAcademicSemesterService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic Semester retrieved successfully',
    data: result,
  })
})

// Controller to find single academic semester by object id
const findSingleAcademicSemesterByIdController = catchAsync(
  async (req, res) => {
    const result =
      await AcademicSemesterServices.findSingleAcademicSemesterByIdService(
        req.params.id,
      )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrieved successfully',
      data: result,
    })
  },
)

// Controller to update single academic semester by object id
const updateSingleAcademicSemesterByIdController = catchAsync(
  async (req, res) => {
    const result =
      await AcademicSemesterServices.updateSingleAcademicSemesterByIdService(
        req.params.id,
        req.body,
      )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester updated successfully',
      data: result,
    })
  },
)

export const AcademicSemesterControllers = {
  createNewAcademicSemesterController,
  findAllAcademicSemesterController,
  findSingleAcademicSemesterByIdController,
  updateSingleAcademicSemesterByIdController,
}
