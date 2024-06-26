import { Router } from 'express'
import auth from '../../middleweres/auth'
import validateRequest from '../../middleweres/validateRequest'
import { USER_ROLE } from '../User/user.constant'
import { AuthControllers } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = Router()

// route to login
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUserController,
)

// route to change password
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePasswordController,
)

// route to change password
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshTokenController,
)

// route to forgot password
router.post(
  '/forgot-password',
  validateRequest(AuthValidation.forgotPasswordValidationSchema),
  AuthControllers.forgotPasswordController,
)

// route to reset password
router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPasswordController,
)

export const AuthRoutes = router
