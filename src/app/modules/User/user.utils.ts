import {
  TAcademicSemester,
  TAcademicSemesterCode,
} from '../AcademicSemester/academicSemester.interface'
import { UserModel } from './user.model'

// get last user id
const getLastStudentId = async (year: string, code: TAcademicSemesterCode) => {
  const yearCode = `^${year}${code}`
  // console.log(yearCode)
  const lastUserId = await UserModel.findOne(
    { role: 'student', id: { $regex: yearCode } }, // find the student which id of first 6 digit exact match with year and role
    { _id: 0, id: 1 },
  ) // project: just get last student id
    .sort({ createdAt: -1 }) // sort: last created student
    .lean() // return pure javascript. not mongoose document

  // console.log(await lastUserId)

  // if last student found return it after skipping first 6 digits
  return lastUserId?.id.substring(6)
}

// generate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  const { year, code } = payload
  // current id
  const currentId: string = (await getLastStudentId(year, code)) || '0'
  // console.log(currentId)
  // increase id +1
  const increment = (+currentId + 1).toString().padStart(4, '0')
  // create full id
  const fullId = `${year}${code}${increment}`
  return fullId
}
