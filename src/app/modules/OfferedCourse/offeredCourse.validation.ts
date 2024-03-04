import { z } from 'zod'
import { days } from './offeredCourse.constant'

const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

// Define Zod schema for AcademicSemester
const OfferedCourseValidationSchema = z.object({
  semesterRegistration: z.string(), // Assuming this is a string for simplicity, adjust as necessary
  academicSemester: z.string(), // Assuming this is a string for simplicity, adjust as necessary
  academicFaculty: z.string(), // Assuming this is a string for simplicity, adjust as necessary
  academicDepartment: z.string(), // Assuming this is a string for simplicity, adjust as necessary
  course: z.string(), // Assuming this is a string for simplicity, adjust as necessary
  faculty: z.string(), // Assuming this is a string for simplicity, adjust as necessary
  maxCapacity: z.number(),
  section: z.number(),
  days: z.array(z.enum(days as [string, ...string[]])),
  startTime: z.string().regex(timeRegex, 'Invalid time format'),
  endTime: z.string().refine(
    time => {
      return timeRegex.test(time)
    },
    { message: "Invalid time format, expected 'HH:MM' in 24 hours format" },
  ),
})

const createOfferedCourseValidationSchema = z.object({
  body: OfferedCourseValidationSchema.refine(
    body => {
      // convert start time and end time into date time formate
      const start = new Date(`1970-01-01T${body.startTime}:00`)
      const end = new Date(`1970-01-01T${body.endTime}:00`)
      // return if start time greater then end time
      return start < end
    },
    { message: 'Start time should be before end time' },
  ),
})

// Define Zod schema for AcademicSemester
const updateOfferedCourseValidationSchema = z.object({
  body: OfferedCourseValidationSchema.partial(),
})

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
}
