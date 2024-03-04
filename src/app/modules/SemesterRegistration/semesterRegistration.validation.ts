import { z } from 'zod'
import { semesterRegistrationStatus } from './semesterRegistration.constant'

// Define Zod schema for AcademicSemester
const semesterRegistrationValidationSchema = z.object({
  academicSemester: z.string(),
  status: z.enum(
    Object.values(semesterRegistrationStatus) as [string, ...string[]],
  ),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
})

const createSemesterRegistrationValidationSchema = z.object({
  body: semesterRegistrationValidationSchema,
})

// Define Zod schema for AcademicSemester
const updateSemesterRegistrationValidationSchema = z.object({
  body: semesterRegistrationValidationSchema.partial(),
})

export const AcademicSemesterValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
}
