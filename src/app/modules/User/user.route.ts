import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createNewStudentController,
)
router.post(
  '/create-faculty',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createNewFacultyController,
)
router.post(
  '/create-admin',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createNewAdminController,
)

router.get('/', UserControllers.getMultipleUsersController)

export const UserRoutes = router
