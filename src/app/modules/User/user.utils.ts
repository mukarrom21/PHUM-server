import { TAcademicSemester } from '../AcademicSemester/academicSemester.interface'
import { USER_ROLE } from './user.constant'
import { TUserRole } from './user.interface'
import { UserModel } from './user.model'

// get last faculty or admin id
const getLastUserId = async (role: TUserRole, payload: string) => {
  // let lastUserId : Record<string,unknown> = {};
  const regex = `^${payload}`
  // console.log(regex)
  const lastUserId = await UserModel.findOne(
    { role, id: { $regex: regex } },
    { _id: 0, id: 1 },
  )
    .sort({ createdAt: -1 }) // sort: last created student
    .lean() // return pure javascript. not mongoose document

  // console.log(lastUserId)
  const substring = role === USER_ROLE.student ? 6 : 2

  return lastUserId?.id?.substring(substring)
}

// // get last user id
// const getLastStudentId = async (year: string, code: TAcademicSemesterCode) => {
//   const yearCode = `^${year}${code}`
//   // console.log(yearCode)
//   const lastUserId = await UserModel.findOne(
//     { role: 'student', id: { $regex: yearCode } }, // find the student which id of first 6 digit exact match with year and role
//     { _id: 0, id: 1 },
//   ) // project: just get last student id
//     .sort({ createdAt: -1 }) // sort: last created student
//     .lean() // return pure javascript. not mongoose document

//   // console.log(await lastUserId)

//   // if last student found return it after skipping first 6 digits
//   return lastUserId?.id.substring(6)
// }

// generate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  const { year, code } = payload
  const yearCode = year + code
  // current id
  const currentId: string =
    (await getLastUserId(USER_ROLE.student, yearCode)) || '0'
  // console.log(currentId)
  // increase id +1
  const increment = (+currentId + 1).toString().padStart(4, '0')
  // create full id
  const fullId = `${year}${code}${increment}`
  return fullId
}

// generate Faculty id
export const generateFacultyId = async () => {
  // current id
  const currentId: string = (await getLastUserId(USER_ROLE.faculty, 'F')) || '0'
  // console.log(currentId)
  // increase id +1
  const increment = (+currentId + 1).toString().padStart(4, '0')
  // create full id
  const fullId = `F-${increment}`
  // console.log(fullId)
  return fullId
}

// generate Faculty id
export const generateAdminId = async () => {
  // current id
  const currentId: string = (await getLastUserId(USER_ROLE.admin, 'A')) || '0'
  // console.log(currentId)
  // increase id +1
  const increment = (+currentId + 1).toString().padStart(4, '0')
  // create full id
  const fullId = `A-${increment}`
  return fullId
}
