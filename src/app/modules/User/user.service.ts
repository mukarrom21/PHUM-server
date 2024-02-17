import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async studentData => {}

const createNewUserService = async (payload: Partial<TUser>) => {
  const result = await User.create(payload)
  return result
}

const findMultipleUsersService = async () => {
  const result = await User.find()
  return result
}

const findSingleUserService = async () => {}
const updateSingleUserService = async () => {}
const deleteSingleUserService = async () => {}
const updateMultipleUsersService = async () => {}
const deleteMultipleUsersService = async () => {}

export const UserServices = {
  createStudentIntoDB,
  createNewUserService,
  findMultipleUsersService,
  findSingleUserService,
  updateSingleUserService,
  deleteSingleUserService,
  updateMultipleUsersService,
  deleteMultipleUsersService,
}
