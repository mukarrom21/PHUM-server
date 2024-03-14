import { Router } from 'express'
import auth from '../../middleweres/auth'
import validateRequest from '../../middleweres/validateRequest'
import { USER_ROLE } from '../User/user.constant'
import { AdminControllers } from './admin.controller'
import { AdminValidations } from './admin.validation'

const router = Router()

router.get('/aggregate', AdminControllers.aggregateController)
router.get('/', auth(USER_ROLE.admin), AdminControllers.getAllAdminsController)
router.get('/:adminId', AdminControllers.getSingleAdminController)
router.patch(
  '/:adminId',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdminController,
)
router.delete('/:adminId', AdminControllers.deleteSingleAdminController)

export const AdminRoutes = router
