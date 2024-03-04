import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { OfferedCourseControllers } from './offeredCourse.controller'
import { OfferedCourseValidations } from './offeredCourse.validation'

const router = Router()

// route to create new academic semester
router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema), // validate with zod
  OfferedCourseControllers.createOfferedCourseController,
)

// route to find all academic semester
router.get('/', OfferedCourseControllers.getAllOfferedCourseController)

// route to find single academic semester by object id
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourseController)

// route to update semester registration by object id
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourseController,
)

export const OfferedCourseRoutes = router
