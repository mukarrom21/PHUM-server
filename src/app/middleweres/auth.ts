import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { TUserRole } from '../modules/User/user.interface'
import { UserModel } from '../modules/User/user.model'
import catchAsync from '../utils/catchAsync'
import { verifyToken } from '../utils/verifyJWT'

const auth = (...userRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization

    // check is the token sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Sorry, token is required')
    }

    // check is the token valid (verify)
    // const decoded = jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    // ) as JwtPayload
    const decoded = await verifyToken(token, config.jwt_access_secret as string)

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
    // check is password changed after jwt token issued
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

    // check is the role correct
    if (userRole && !userRole.includes(decoded?.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'Sorry, you are not authorized client',
      )
    }

    // if valid add the decoded data in the req->user to access from all req
    req.user = decoded
    next()
  })
}

export default auth
