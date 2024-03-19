import { NextFunction, Request, Response, Router } from 'express'
import auth from '../../middleweres/auth'
import validateRequest from '../../middleweres/validateRequest'
import { upload } from '../../utils/sendImageToCloudinary'
import { AdminValidations } from '../Admin/admin.validation'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  // call multer to parse file
  upload.single('file'),
  // parse form data into json middleware
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createNewStudentController,
)
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  // call multer to parse file
  upload.single('file'),
  // parse form data into json middleware
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createNewFacultyController,
)

router.post(
  '/create-admin',
  // call multer to parse file
  upload.single('file'),
  // parse form data into json middleware
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createNewAdminController,
)

// update user status
router.patch(
  '/update-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.updateStatusValidationSchema),
  UserControllers.updateUserStatusController,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  UserControllers.getMultipleUsersController,
)

router.get(
  '/me',
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  UserControllers.getMeController,
)

export const UserRoutes = router
