import { Schema, model } from 'mongoose'
import { TAdmin, TName } from './admin.interface'

const nameSchema = new Schema<TName>(
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

const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'user',
    },
    name: { type: nameSchema, required: true },
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
adminSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})

// pre middleware -> prevent deleted documents from find
adminSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from findOne
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from findOneAndUpdate
adminSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// pre middleware -> prevent deleted documents from aggregation
adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

export const AdminModel = model<TAdmin>('Admin', adminSchema)
