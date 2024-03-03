import { Router } from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { FacultyControllers } from './faculty.controller'
import { FacultyValidations } from './faculty.validation'

const router = Router()

router.get('/aggregate', FacultyControllers.aggregateController)
router.get('/', FacultyControllers.getAllFacultiesController)
router.get('/:facultyId', FacultyControllers.getSingleFacultyController)
router.patch(
  '/:facultyId',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFacultyController,
)
router.delete('/:facultyId', FacultyControllers.deleteSingleFacultyController)

export const FacultyRoutes = router
