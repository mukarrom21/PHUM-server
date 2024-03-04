import { Schema, model } from 'mongoose'
import { days } from './offeredCourse.constant'
import { TOfferedCourse } from './offeredCourse.interface'

// Define Mongoose schema
const offeredCourseSchema = new Schema<TOfferedCourse>(
  {
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
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    maxCapacity: {
      type: Number,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    days: {
      type: [String],
      enum: days,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const OfferedCourseModel = model<TOfferedCourse>(
  'Offered-course',
  offeredCourseSchema,
)
