import config from '../../config'
import { TStudent } from '../Student/student.interface'
import { StudentModel } from '../Student/student.model'
import { USER_ROLE } from './user.constant'
import { TUser } from './user.interface'
import { UserModel } from './user.model'

//-- Service to create new student
const createNewStudentService = async (
  password: string,
  studentData: TStudent,
) => {
  // create user object
  const userData: Partial<TUser> = {}

  // set given password or default password
  userData.password = password || (config.default_password as string)

  // set student role
  userData.role = USER_ROLE.student

  // set manually id
  userData.id = '2030110002'

  // create a user
  const user = await UserModel.create(userData)

  // create a student
  if (Object.keys(user).length) {
    // set id, _id as user
    studentData.id = user.id
    studentData.user = user._id
  }

  const result = await StudentModel.create(studentData)

  return result
}

const findMultipleUsersService = async () => {
  const result = await UserModel.find()
  return result
}

const findSingleUserService = async () => {}
const updateSingleUserService = async () => {}
const deleteSingleUserService = async () => {}
const updateMultipleUsersService = async () => {}
const deleteMultipleUsersService = async () => {}

export const UserServices = {
  createNewStudentService,
  findMultipleUsersService,
  findSingleUserService,
  updateSingleUserService,
  deleteSingleUserService,
  updateMultipleUsersService,
  deleteMultipleUsersService,
}
