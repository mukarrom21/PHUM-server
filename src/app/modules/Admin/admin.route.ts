import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { AdminControllers } from './admin.controller'
import { AdminValidations } from './admin.validation'

const router = Router()

router.get('/aggregate', AdminControllers.aggregateController)
router.get('/', AdminControllers.getAllAdminsController)
router.get('/:adminId', AdminControllers.getSingleAdminController)
router.patch(
  '/:adminId',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdminController,
)
router.delete('/:adminId', AdminControllers.deleteSingleAdminController)

export const AdminRoutes = router
