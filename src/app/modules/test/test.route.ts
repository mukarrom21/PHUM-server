import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TestControllers } from './test.controller'
import { TestValidations } from './test.validation'

// declare a new router to include all the endpoints
const router = Router()

// define the test route
router.post(
  '/',
  validateRequest(TestValidations.createTestValidation),
  TestControllers.createTestController,
)

// define the get all tests route
router.get('/', TestControllers.getAllTestsController)

// define the get single test route
router.get('/:id', TestControllers.getSingleTestController)

// define the update test route
router.put(
  '/:id',
  validateRequest(TestValidations.updateTestValidation),
  TestControllers.updateTestController,
)

// define the delete test route
router.delete('/:id', TestControllers.deleteTestController)

// export the router
export const TestRoute = router
