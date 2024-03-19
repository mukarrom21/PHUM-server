import jwt, { JwtPayload } from 'jsonwebtoken'
import { TUserRole } from '../User/user.interface'

export const generateJwtToken = (
  payload: { id: string; role: TUserRole },
  jwtAccessSecret: string,
  expiresIn: string,
) => {
  return jwt.sign(payload, jwtAccessSecret, { expiresIn })
}

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload
}
