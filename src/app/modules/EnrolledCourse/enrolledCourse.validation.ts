import { z } from 'zod'

const createEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
})

// update course marks validation
const updateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    courseMarks: z
      .object({
        classTest1: z.number(),
        midTerm: z.number(),
        classTest2: z.number(),
        finalTerm: z.number(),
      })
      .partial(),
  }),
})

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationSchema,
  updateEnrolledCourseValidationSchema,
}
