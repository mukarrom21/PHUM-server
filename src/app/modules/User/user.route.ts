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

router.get('/', UserControllers.getMultipleUsersController)

export const UserRoutes = router
