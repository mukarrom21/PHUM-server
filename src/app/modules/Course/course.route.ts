import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { CourseControllers } from './course.controller'
import { CourseValidations } from './course.validation'

const router = Router()

// Route to create new course
router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createNewCourseController,
)

// Route to get all courses
router.get('/', CourseControllers.findAllCourseController)

// Route to get single course
router.get('/:id', CourseControllers.findSingleCourseByIdController)

// Route to update course
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourseController,
)

// Route to delete course
router.delete('/:id', CourseControllers.deleteCourseController)

export const CourseRoutes = router
