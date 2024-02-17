import { Model } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TUserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TStudent = {
  id: string
  password: string
  name: TUserName
  gender: 'male' | 'female' // literal type
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'AB+' | 'B+' | 'O+' | 'A-' | 'AB-' | 'B-' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  isActive: 'active' | 'blocked'
  isDeleted: boolean
}

// create custom static
export interface IStudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

// create custom instance
// // Put all student instance methods in this type:
// export type TStudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>
// }

// // Create a new Model type that knows about TStudentMethods...
// export type TStudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   TStudentMethods
// >
