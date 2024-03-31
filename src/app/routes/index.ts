// Import necessary modules and types from external files
import { Router } from 'express'
import { AcademicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.route'
import { AcademicSemesterRoutes } from '../modules/AcademicSemester/academicSemester.route'
import { AdminRoutes } from '../modules/Admin/admin.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { BypassRoutes } from '../modules/Bypass/bypass.route'
import { CourseRoutes } from '../modules/Course/course.route'
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route'
import { FacultyRoutes } from '../modules/Faculty/faculty.route'
import { OfferedCourseRoutes } from '../modules/OfferedCourse/offeredCourse.route'
import { SemesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.route'
import { StudentRoutes } from '../modules/Student/student.route'
import { UserRoutes } from '../modules/User/user.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
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
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bypass',
    route: BypassRoutes,
  },
]

// Iterate through the moduleRoutes array and attach each route to the main router
moduleRoutes.forEach(route => router.use(route.path, route.route))

// Export the main router with combined module routes
export default router
