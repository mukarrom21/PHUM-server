import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { sendEmail } from '../../utils/sendEmail'
import { USER_STATUS } from '../User/user.constant'
import { UserModel } from '../User/user.model'
import { TLoginUser } from './auth.interface'
import { generateJwtToken } from './auth.utils'

// service to login user
const loginUserService = async (payload: TLoginUser) => {
  // find user by user id
  // const user = await UserModel.findOne({ id: payload?.id }).select('+password')
  const user = await UserModel.isUserExists(payload.id)
  // Check if the user not exists throw Error
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }
  // check is deleted softly, if deleted throw error
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }
  // check status, if blocked throw error
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }
  // checking is the password matched
  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your password is incorrect')
  }

  const jwtPayload = { id: user?.id, role: user?.role }
  // generate access token
  const jwtAccessToken = generateJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  // generate refresh token
  const jwtRefreshToken = generateJwtToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  // return
  return {
    jwtAccessToken,
    jwtRefreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

// service to change password
const changePasswordService = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user exists
  const user = await UserModel.isUserExists(userData.id)

  // if user not found throw error
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }

  // check if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is deleted!')
  }

  // check if user is blocked
  if (user?.status === USER_STATUS.blocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
  }

  // check is user old password correct?
  if (
    !(await UserModel.isPasswordMatched(payload?.oldPassword, user?.password))
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, your password is not matched!',
    )
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  )

  // change the password
  await UserModel.findOneAndUpdate(
    {
      id: user?.id,
      role: user?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  )

  return null
}

// service to get new access token by refresh token
const refreshTokenService = async (token: string) => {
  // check is the token sent from the client
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Sorry, token is required')
  }

  // check is the token valid (verify)
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload

  // const user = await UserModel.findOne({ id: payload?.id }).select('+password')
  const user = await UserModel.isUserExists(decoded.id)
  // Check if the user not exists throw Error
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Sorry, user is not found with this token',
    )
  }
  // check is deleted softly, if deleted throw error
  if (user?.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, user is deleted with this token',
    )
  }
  // check status, if blocked throw error
  if (user?.status === 'blocked') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, user is blocked with this token',
    )
  }
  // // check is password changed after jwt token issued
  // console.log(
  //   UserModel.isJWTIssuedBeforePasswordChanged(
  //     user.passwordChangedAt as Date,
  //     decoded.iat as number,
  //   ),
  // )
  if (
    UserModel.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt as Date,
      decoded.iat as number,
    )
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, your password is changed. Please login again.',
    )
  }

  const jwtPayload = { id: user?.id, role: user?.role }

  // generate access token
  const accessToken = generateJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  // return accessToken
  return accessToken
}

// service to generate reset password link
const forgotPasswordService = async (userId: string) => {
  // retrieve user data by user id
  const user = await UserModel.isUserExists(userId)
  // Check if the user not exists throw Error
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Sorry, user is not found with this id',
    )
  }
  // check is deleted softly, if deleted throw error
  if (user?.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, user is deleted with this token',
    )
  }
  // check status, if blocked throw error
  if (user?.status === 'blocked') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, user is blocked with this token',
    )
  }

  const jwtPayload = { id: user?.id, role: user?.role }
  // generate access token
  const jwtAccessToken = generateJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10d',
  )

  // generate reset link
  const resetUILink = `${config.reset_password_ui_link}?id=${user?.id}&token=${jwtAccessToken}`

  sendEmail(user?.email, resetUILink)
}

// service to reset password
const resetPasswordService = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // retrieve user data by user id
  const user = await UserModel.isUserExists(payload.id)
  // Check if the user not exists throw Error
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Sorry, user is not found with this id',
    )
  }
  // check is deleted softly, if deleted throw error
  if (user?.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, user is deleted with this token',
    )
  }
  // check status, if blocked throw error
  if (user?.status === 'blocked') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Sorry, user is blocked with this token',
    )
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload
  // check is id correct
  if (payload.id !== decoded.id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Sorry, your id in token and body are not same',
    )
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  )

  // update password
  const result = await UserModel.findOneAndUpdate(
    { id: decoded?.id, role: decoded?.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    { new: true },
  )
  return result
}


// export all services
export const AuthServices = {
  loginUserService,
  changePasswordService,
  refreshTokenService,
  forgotPasswordService,
  resetPasswordService,
}
