import { Router } from 'express'
import auth from '../../middleweres/auth'
import validateRequest from '../../middleweres/validateRequest'
import { USER_ROLE } from '../User/user.constant'
import { EnrolledCourseControllers } from './enrolledCourse.controller'
import { EnrolledCourseValidations } from './enrolledCourse.validation'

const router = Router()

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourseController,
)

// update enrolled course marks route
router.patch(
  '/update-marks',
  auth(USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseValidationSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarksController,
)

export const EnrolledCourseRoutes = router
