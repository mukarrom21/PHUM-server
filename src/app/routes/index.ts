import { Router } from 'express'
import { TestRoute } from '../modules/test/test.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/tests',
    route: TestRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
