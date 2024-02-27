import { z } from 'zod'

// Define Zod schema for AcademicSemester
const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Academic Faculty name is required',
      invalid_type_error: 'Academic Faculty name must be string',
    }),
  }),
})

export const AcademicFacultyValidations = {
  academicFacultyValidationSchema,
}
