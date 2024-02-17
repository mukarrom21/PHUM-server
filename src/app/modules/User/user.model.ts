import { Schema, model } from 'mongoose'
import { USER_ROLE, USER_STATUS } from './user.constant'
import { TUser } from './user.interface'

// Define a Mongoose schema for the User model
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    // password
    password: {
      type: String,
      required: true,
    },
    // Flag indicating whether the user needs to change their password
    needsPasswordChange: {
      type: Boolean,
      default: true,
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

// Create a Mongoose model for the User using the defined schema
export const User = model<TUser>('User', userSchema)
