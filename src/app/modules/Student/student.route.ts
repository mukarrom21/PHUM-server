import { Router } from 'express'
import { StudentControllers } from './student.controller'

const router = Router()

// router.post(
//   '/create-student',
//   validateRequest(StudentValidations.StudentValidationSchema),
//   StudentControllers.createNewStudentController,
// )
router.get('/aggregate', StudentControllers.aggregateController)
router.get('/', StudentControllers.getAllStudentsController)
router.get('/:studentId', StudentControllers.getSingleStudentController)
router.patch('/:studentId', StudentControllers.updateSingleStudentController)
router.delete('/:studentId', StudentControllers.deleteSingleStudentController)

export const StudentRoutes = router
