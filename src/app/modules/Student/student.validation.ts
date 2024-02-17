import { z } from 'zod'

// Define schema for user name
const UserNameSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }),
  middleName: z.string().optional(),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }),
})

// Define schema for guardian
const GuardianSchema = z.object({
  fatherName: z.string({
    required_error: "Father's name is required",
    invalid_type_error: "Father's name must be a string",
  }),
  fatherOccupation: z.string({
    required_error: "Father's occupation is required",
    invalid_type_error: "Father's occupation must be a string",
  }),
  fatherContactNo: z.string({
    required_error: "Father's contact number is required",
    invalid_type_error: "Father's contact number must be a string",
  }),
  motherName: z.string({
    required_error: "Mother's name is required",
    invalid_type_error: "Mother's name must be a string",
  }),
  motherOccupation: z.string({
    required_error: "Mother's occupation is required",
    invalid_type_error: "Mother's occupation must be a string",
  }),
  motherContactNo: z.string({
    required_error: "Mother's contact number is required",
    invalid_type_error: "Mother's contact number must be a string",
  }),
})

// Define schema for local guardian
const LocalGuardianSchema = z.object({
  name: z.string({
    required_error: "Local guardian's name is required",
    invalid_type_error: "Local guardian's name must be a string",
  }),
  occupation: z.string({
    required_error: "Local guardian's occupation is required",
    invalid_type_error: "Local guardian's occupation must be a string",
  }),
  contactNo: z.string({
    required_error: "Local guardian's contact number is required",
    invalid_type_error: "Local guardian's contact number must be a string",
  }),
  address: z.string({
    required_error: "Local guardian's address is required",
    invalid_type_error: "Local guardian's address must be a string",
  }),
})

// Define schema for student
const StudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      id: z.string({
        required_error: 'Student ID is required',
        invalid_type_error: 'Student ID must be a string',
      }),
      password: z
        .string({
          required_error: 'Password is required',
          invalid_type_error: 'Password must be a string',
        })
        .min(6, { message: 'Password must be minimum 6 characters' })
        .max(20, 'Password cannot be more than 20 characters'),
      name: UserNameSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
        invalid_type_error: 'Date of birth must be a string',
      }),
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a valid email address',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
        invalid_type_error: 'Contact number must be a string',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
        invalid_type_error: 'Emergency contact number must be a string',
      }),
      bloodGroup: z.enum(['A+', 'AB+', 'B+', 'O+', 'A-', 'AB-', 'B-', 'O-']),
      presentAddress: z.string({
        required_error: 'Present address is required',
        invalid_type_error: 'Present address must be a string',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
        invalid_type_error: 'Permanent address must be a string',
      }),
      guardian: GuardianSchema,
      localGuardian: LocalGuardianSchema,
      profileImg: z
        .string({
          required_error: 'Profile image URL is required',
          invalid_type_error: 'Profile image URL must be a valid URL',
        })
        .url()
        .optional(),
      isActive: z.enum(['active', 'blocked']).optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
})

export const StudentValidations = {
  StudentValidationSchema,
}
