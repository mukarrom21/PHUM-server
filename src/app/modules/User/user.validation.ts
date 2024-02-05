// Import necessary modules and constants from external files
import { z } from 'zod'

// Validation schema for user data
const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    }),
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    }),
    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(6, { message: 'Password cannot be less than 6 characters' })
      .max(20, { message: 'Password cannot be more than 20 characters' })
      .optional(),
  }),
})

// // Validation schema for changing user status
// const changeStatusValidationSchema = z.object({
//   body: z.object({
//     status: z.enum([...UserStatus] as [string, ...string[]]),
//   }),
// })

// Export an object containing user-related validation schemas
export const UserValidation = {
  userValidationSchema,
  //   changeStatusValidationSchema,
}
