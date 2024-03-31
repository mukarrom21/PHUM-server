import { Schema, model } from 'mongoose'
import { grade } from './enrolledCourse.constant'
import { TEnrolledCourse } from './enrolledCourse.interface'

// Define Mongoose schema
const TCourseMarksSchema = new Schema(
  {
    classTest1: { type: Number, default: 0 },
    midTerm: { type: Number, default: 0 },
    classTest2: { type: Number, default: 0 },
    finalTerm: { type: Number, default: 0 },
  },
  {
    _id: false,
  },
)

const EnrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'Semester-registration',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'Academic-semester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'Academic-faculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'Academic-department',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'Offered-course',
    required: true,
  },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty', required: true },
  isEnrolled: { type: Boolean, default: false },
  courseMarks: { type: TCourseMarksSchema, default: {} },
  grade: {
    type: String,
    enum: grade,
    default: 'NA',
  },
  gradePoints: { type: Number, min: 0, max: 4, default: 0 },
  isCompleted: { type: Boolean, default: false },
})

export const EnrolledCourseModel = model<TEnrolledCourse>(
  'EnrolledCourse',
  EnrolledCourseSchema,
)
