import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controller'
import { AcademicFacultyValidations } from './academicFaculty.validation'

const router = Router()

// route to create new academic Faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema), // validate with zod
  AcademicFacultyControllers.createNewAcademicFacultyController,
)

// route to find all academic Faculty
router.get('/', AcademicFacultyControllers.findAllAcademicFacultyController)

// route to find single academic Faculty by object id
router.get(
  '/:id',
  AcademicFacultyControllers.findSingleAcademicFacultyByIdController,
)

// route to update single academic Faculty by object id
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidations.academicFacultyValidationSchema),
  AcademicFacultyControllers.updateSingleAcademicFacultyByIdController,
)

export const AcademicFacultyRoutes = router
