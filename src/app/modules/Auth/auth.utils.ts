import jwt from 'jsonwebtoken'
import { TUserRole } from '../User/user.interface'

export const generateJwtToken = (
  payload: { id: string; role: TUserRole },
  jwtAccessSecret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, jwtAccessSecret, { expiresIn })
}
