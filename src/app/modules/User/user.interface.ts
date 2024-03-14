/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type TUserRole = 'admin' | 'student' | 'faculty'
export type TUser = {
  id: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  role: TUserRole
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface IUserModel extends Model<TUser> {
  // Is user exists
  isUserExists(id: string): Promise<TUser>
  // Is password matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  // is password changed after issued JWT token?
  isJWTIssuedBeforePasswordChanged(
    passwordChangedDate: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}
