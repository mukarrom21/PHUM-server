import bcrypt from 'bcrypt'
import config from '../../config'
import { UserModel } from '../User/user.model'

// service to change password
const changePasswordService = async (payload: {
  id: string
  newPassword: string
}) => {
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  )

  // change the password
  const result = await UserModel.findOneAndUpdate(
    {
      id: payload.id,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  )

  return result
}

export const BypassServices = {
  changePasswordService,
}
