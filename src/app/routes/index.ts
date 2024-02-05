// Import necessary modules and types from external files
import { Router } from 'express'
import { UserRoutes } from '../modules/User/user.route'
// import { AuthRoutes } from '../modules/Auth/auth.route'
// import { UserRoutes } from '../modules/User/user.route'

// Create an instance of the Express Router
const router = Router()

interface IModuleRoute {
  path: string
  route: Router
}

// Define an array of module routes, each specifying a path and its corresponding route handler
const moduleRoutes: IModuleRoute[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  //   {
  //     path: '/auth',
  //     route: AuthRoutes,
  //   },
]

// Iterate through the moduleRoutes array and attach each route to the main router
moduleRoutes.forEach(route => router.use(route.path, route.route))

// Export the main router with combined module routes
export default router
