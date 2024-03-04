import { Schema, model } from 'mongoose'
import { semesterRegistrationStatus } from './semesterRegistration.constant'
import { TSemesterRegistration } from './semesterRegistration.interface'

// Define Mongoose schema
const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(semesterRegistrationStatus),
      default: semesterRegistrationStatus.UPCOMING,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, default: 3 },
    maxCredit: { type: Number, default: 15 },
  },
  { timestamps: true },
)

export const SemesterRegistrationModel = model<TSemesterRegistration>(
  'semester-registration',
  semesterRegistrationSchema,
)
