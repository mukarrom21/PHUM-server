import { Router } from 'express'
import { BypassControllers } from './bypass.controller'

const router = Router()

router.patch(
  '/change-password',
  //   auth(USER_ROLE.admin),
  BypassControllers.changePasswordController,
)

export const BypassRoutes = router
