import { Schema, model } from 'mongoose'
import { USER_ROLE } from '../User/user.constant'
import { TFaculty, TName } from './faculty.interface'

const userNameSchema = new Schema<TName>(
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

const facultySchema = new Schema<TFaculty>(
  {
    id: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: 'faculty',
    },
    name: { type: userNameSchema, required: true },
    gender: { type: String, enum: ['male', 'female'] }, // literal type
    dateOfBirth: { type: String },
    email: { type: String, unique: true },
    contactNo: { type: String },
    emergencyContactNo: { type: String },
    bloodGroup: {
      type: String,
      enum: { values: ['A+', 'AB+', 'B+', 'O+', 'A-', 'AB-', 'B-', 'O-'] },
    },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'Academic-department', // collection name
    },
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
facultySchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})

// pre middleware -> prevent deleted documents from find
facultySchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from findOne
facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from findOneAndUpdate
facultySchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from aggregation
facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

export const FacultyModel = model<TFaculty>('Faculty', facultySchema)
