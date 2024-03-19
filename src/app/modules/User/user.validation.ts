// Import necessary modules and constants from external files
import { z } from 'zod'
import { USER_STATUS } from './user.constant'

// Validation schema for user data
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(6, { message: 'Password must be minimum 6 characters' })
    .optional(),
})

// Validation schema for changing user status
const updateStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...Object.values(USER_STATUS)] as [string, ...string[]]),
  }),
})

// Export an object containing user-related validation schemas
export const UserValidation = {
  userValidationSchema,
    updateStatusValidationSchema,
}
