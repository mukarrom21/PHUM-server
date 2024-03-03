import { z } from 'zod'

const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const courseValidationSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be string',
  }),
  prefix: z.string({
    required_error: 'prefix is required',
    invalid_type_error: 'prefix must be string',
  }),
  code: z.number({
    required_error: 'code is required',
    invalid_type_error: 'code must be number',
  }),
  credits: z.number({
    required_error: 'credits is required',
    invalid_type_error: 'credits must be number',
  }),
  preRequisiteCourses: z.array(preRequisiteCoursesValidationSchema).optional(),
})

const createCourseValidationSchema = z.object({
  body: courseValidationSchema,
})

const updateCourseValidationSchema = courseValidationSchema.partial()

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
}
