import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import AppError from '../../errors/AppError'
import { months, semesterCode, semesterName } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'

// Define Mongoose schema
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: [...semesterName], required: true },
    code: { type: String, enum: [...semesterCode], required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: months, required: true },
    endMonth: { type: String, enum: months, required: true },
  },
  { timestamps: true },
)

// check if semester year and name are same prevent to create new semester
academicSemesterSchema.pre('save', async function (next) {
  // find is same year and name exists
  const isSemesterExist = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  })
  // throw error if exist
  if (isSemesterExist) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This semester is already exists.',
    )
  }
  next()
})

export const AcademicSemesterModel = model<TAcademicSemester>(
  'Academic-semester',
  academicSemesterSchema,
)
