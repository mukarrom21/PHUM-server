import { Schema, model } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

// Define Mongoose schema
const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true },
)

export const AcademicFacultyModel = model<TAcademicFaculty>(
  'Academic-faculty',
  academicFacultySchema,
)
