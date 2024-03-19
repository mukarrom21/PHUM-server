import httpStatus from 'http-status'
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const loginUserController = catchAsync(async (req, res) => {
  const { jwtAccessToken, jwtRefreshToken, needsPasswordChange } =
    await AuthServices.loginUserService(req.body)

  res.cookie('refreshToken', jwtRefreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully',
    data: { jwtAccessToken, jwtRefreshToken, needsPasswordChange },
  })
})

// Controller to change user password
const changePasswordController = catchAsync(async (req, res) => {
  const result = await AuthServices.changePasswordService(req.user, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User password changed successfully',
    data: result,
  })
})

// Controller to retrieve new access token with by refresh token
const refreshTokenController = catchAsync(async (req, res) => {
  // get refresh token from cookies
  const { refreshToken } = req.cookies
  // call refresh token service
  const result = await AuthServices.refreshTokenService(refreshToken)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully',
    data: result,
  })
})

// Controller to generate reset ui link
const forgotPasswordController = catchAsync(async (req, res) => {
  // get refresh token from cookies
  const userId = req.body.id
  // call refresh token service
  const result = await AuthServices.forgotPasswordService(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset Ui link generated successfully',
    data: result,
  })
})

// Controller to for resetting ui link
const resetPasswordController = catchAsync(async (req, res) => {
  // get refresh token from cookies
  const token = req.headers.authorization
  // call refresh token service
  const result = await AuthServices.resetPasswordService(
    req.body,
    token as string,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  })
})

export const AuthControllers = {
  loginUserController,
  changePasswordController,
  refreshTokenController,
  forgotPasswordController,
  resetPasswordController,
}
