import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices as SemesterRegistrationServices } from './semesterRegistration.service'

const createSemesterRegistrationController = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationService(
      req.body,
    )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Semester registration created successfully',
    data: result,
  })
})

// Controller to find all academic semester
const getAllSemesterRegistrationController = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationService(
      req.query,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Semester registrations retrieved successfully',
    data: result,
  })
})

// Controller to find single academic semester by object id
const getSingleSemesterRegistrationController = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationService(
      req.params.id,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single semester registration retrieved successfully',
    data: result,
  })
})

// Controller to update single academic semester by object id
const updateSemesterRegistrationController = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationService(
      req.params.id,
      req.body,
    )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester registration updated successfully',
    data: result,
  })
})

export const SemesterRegistrationControllers = {
  createSemesterRegistrationController,
  getAllSemesterRegistrationController,
  getSingleSemesterRegistrationController,
  updateSemesterRegistrationController,
}
