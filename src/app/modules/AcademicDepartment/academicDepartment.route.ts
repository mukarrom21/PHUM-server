import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { AcademicDepartmentControllers } from './academicDepartment.controller'
import { AcademicDepartmentValidations } from './academicDepartment.validation'

const router = Router()

// route to create new academic Department
router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ), // validate with zod
  AcademicDepartmentControllers.createNewAcademicDepartmentController,
)

// route to find all academic Department
router.get(
  '/',
  AcademicDepartmentControllers.findAllAcademicDepartmentController,
)

// route to find single academic Department by object id
router.get(
  '/:id',
  AcademicDepartmentControllers.findSingleAcademicDepartmentByIdController,
)

// route to update single academic Department by object id
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateSingleAcademicDepartmentByIdController,
)

export const AcademicDepartmentRoutes = router
