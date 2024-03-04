import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { SemesterRegistrationControllers } from './semesterRegistration.controller'
import { AcademicSemesterValidations as SemesterRegistrationValidations } from './semesterRegistration.validation'

const router = Router()

// route to create new academic semester
router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ), // validate with zod
  SemesterRegistrationControllers.createSemesterRegistrationController,
)

// route to find all academic semester
router.get(
  '/',
  SemesterRegistrationControllers.getAllSemesterRegistrationController,
)

// route to find single academic semester by object id
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistrationController,
)

// route to update semester registration by object id
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistrationController,
)

export const SemesterRegistrationRoutes = router
