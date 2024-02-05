import { IUser } from './user.interface'
import { UserModel } from './user.model'

const createNewUserService = async (payload: Partial<IUser>) => {
  const result = await UserModel.create(payload)
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
  createNewUserService,
  findMultipleUsersService,
  findSingleUserService,
  updateSingleUserService,
  deleteSingleUserService,
  updateMultipleUsersService,
  deleteMultipleUsersService,
}
