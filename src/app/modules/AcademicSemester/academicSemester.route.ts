import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { AcademicSemesterControllers } from './academicSemester.controller'
import { AcademicSemesterValidations } from './academicSemester.validation'

const router = Router()

// route to create new academic semester
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), // validate with zod
  AcademicSemesterControllers.createNewAcademicSemesterController,
)

// route to find all academic semester
router.get('/', AcademicSemesterControllers.findAllAcademicSemesterController)

// route to find single academic semester by object id
router.get(
  '/:id',
  AcademicSemesterControllers.findSingleAcademicSemesterByIdController,
)

// route to update single academic semester by object id
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemesterByIdController,
)

export const AcademicSemesterRoutes = router
