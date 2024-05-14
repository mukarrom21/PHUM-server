import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { AcademicSemesterControllers } from './academicSemester.controller'
import { AcademicSemesterValidations } from './academicSemester.validation'
import { USER_ROLE } from '../User/user.constant'
import auth from '../../middleweres/auth'

const router = Router()

// route to create new academic semester
router.post(
  '/create-semester',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ), // validate with zod
  AcademicSemesterControllers.createNewAcademicSemesterController,
)

// route to find all academic semester
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AcademicSemesterControllers.findAllAcademicSemesterController,
)

// route to find single academic semester by object id
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  AcademicSemesterControllers.findSingleAcademicSemesterByIdController,
)

// route to update single academic semester by object id
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemesterByIdController,
)

export const AcademicSemesterRoutes = router
