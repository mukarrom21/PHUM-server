import { Schema, model } from 'mongoose'
import { USER_ROLE } from './user.constant'
import { IUser } from './user.interface'

// Define a Mongoose schema for the User model
const userSchema = new Schema<IUser>(
  {
    // User's name
    name: {
      type: String,
    },

    // User's email address
    email: {
      type: String,
      unique: true,
    },

    // User's password
    password: String,

    // Flag indicating whether the user needs to change their password
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },

    // Date when the user last changed their password
    //   passwordChangedAt: Date,

    // User's role, restricted to predefined roles in USER_ROLE constant
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLE),
        message: 'Invalid role type',
      },
      default: 'user',
    },

    // User's status, limited to 'active' or 'blocked'
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
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
export const UserModel = model<IUser>('User', userSchema)
