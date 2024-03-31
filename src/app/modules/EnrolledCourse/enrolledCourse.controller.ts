import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseServices } from './enrolledCourse.service'

const createEnrolledCourseController = catchAsync(async (req, res) => {
  const userId = req.user.id
  const result = await EnrolledCourseServices.createEnrolledCourseService(
    userId,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Enrolled course created successfully',
    data: result,
  })
})

// update enrolled course marks controller
const updateEnrolledCourseMarksController = catchAsync(async (req, res) => {
  const facultyId = req.user.id
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksService(
    facultyId,
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Enrolled course marks updated successfully',
    data: result,
  })
})

export const EnrolledCourseControllers = {
  createEnrolledCourseController,
  updateEnrolledCourseMarksController
}
