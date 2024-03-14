import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../config'
import { USER_ROLE, USER_STATUS } from './user.constant'
import { IUserModel, TUser } from './user.interface'

// Define a Mongoose schema for the User model
const userSchema = new Schema<TUser, IUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // password
    password: {
      type: String,
      required: true,
      select: 0,
    },
    // Flag indicating whether the user needs to change their password
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    // User's role, restricted to predefined roles in USER_ROLE constant
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLE),
        message: '{VALUE} is not a valid role!',
      },
    },
    // User's status, limited to 'active' or 'blocked'
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: 'in-progress',
    },
    // Flag indicating whether the user is deleted
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// static method to check is user exists with user id
userSchema.statics.isUserExists = async function (id: string) {
  return await UserModel.findOne({ id }).select('+password')
}

// static method to check is password matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// static method to check is JWT issued before password changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  // check is user password after jwt issued or jwt issued after password change
  const isTrue =
    new Date(passwordChangedTimestamp).getTime() / 1000 > jwtIssuedTimestamp
  return isTrue
}

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

// Create a Mongoose model for the User using the defined schema
export const UserModel = model<TUser, IUserModel>('User', userSchema)
