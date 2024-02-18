import { Schema, model } from 'mongoose'
import {
  IStudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // TStudentMethods,
  // TStudentModel,
  TUserName,
} from './student.interface'

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  { _id: false },
)

const guardianSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
    },
    fatherOccupation: {
      type: String,
    },
    fatherContactNo: {
      type: String,
    },
    motherName: {
      type: String,
    },
    motherOccupation: {
      type: String,
    },
    motherContactNo: {
      type: String,
    },
  },
  { _id: false },
)

const localGuardianSchema = new Schema<TLocalGuardian>(
  {
    name: {
      type: String,
    },
    occupation: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { _id: false },
)

const studentSchema = new Schema<TStudent, IStudentModel>(
  {
    id: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'user',
    },
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: ['male', 'female'] }, // literal type
    dateOfBirth: { type: String },
    email: { type: String },
    contactNo: { type: String },
    emergencyContactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: { values: ['A+', 'AB+', 'B+', 'O+', 'A-', 'AB-', 'B-', 'O-'] },
    },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

// mongoose virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// // pre middleware/hook to hash password
// studentSchema.pre('save', async function (next) {
//   // hash password before saving
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_salt_round),
//   )
//   next()
// })

// pre middleware -> prevent deleted documents from find
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from findOne
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from aggregation
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// Mongoose custom static method
// studentSchema.statics.isUserExists = async function (id: string) {
//   // find student data by student id
//   const existingStudentData = await StudentModel.findOne({ id })
//   return existingStudentData
// }

// Mongoose custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   // find student data by student id
//   const existingUser = await StudentModel.findOne({ id })
//   return existingUser
// }

export const StudentModel = model<TStudent, IStudentModel>(
  'Student',
  studentSchema,
)
