import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'

export const verifyToken = async (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload
  } catch (error: any) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token or expired')
  }
}
