import { z } from 'zod'
import { months, semesterCode, semesterName } from './academicSemester.constant'

// Define Zod schema for AcademicSemester
const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    // code: z.enum([...semesterCode] as [string, ...string[]]),
    year: z.string({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a valid string',
    }),
    // startMonth: z.enum(months as [string, ...string[]]),
    // endMonth: z.enum(months as [string, ...string[]]),
  }),
})

// Define Zod schema for AcademicSemester
const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]).optional(),
    code: z.enum([...semesterCode] as [string, ...string[]]).optional(),
    year: z
      .string({
        required_error: 'Year is required',
        invalid_type_error: 'Year must be a valid string',
      })
      .optional(),
    startMonth: z.enum(months as [string, ...string[]]).optional(),
    endMonth: z.enum(months as [string, ...string[]]).optional(),
  }),
})

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
}
