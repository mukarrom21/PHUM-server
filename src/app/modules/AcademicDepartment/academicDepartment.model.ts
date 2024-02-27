import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import AppError from '../../errors/AppError'
import { TAcademicDepartment } from './academicDepartment.interface'

// Define Mongoose schema
const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Academic-faculty',
      required: true,
    },
  },
  { timestamps: true },
)

// pre hook to check is the same name exists in DB before creating new
academicDepartmentSchema.pre('save', async function (next) {
  const isExists = await AcademicDepartmentModel.findOne({ name: this.name })
  console.log(isExists)

  if (isExists) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This department name is already exists!',
    )
  }

  next()
})

// pre hook to check is before update is this id exists or not
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  // get id from query
  const query = this.getQuery()
  // find with this query
  const isExists = await AcademicDepartmentModel.findOne(query)
  if (!isExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department with this id is not exists!',
    )
  }
  next()
})

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'Academic-department',
  academicDepartmentSchema,
)
