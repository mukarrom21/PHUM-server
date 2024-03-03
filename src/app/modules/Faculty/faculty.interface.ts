import { Types } from 'mongoose'
import { TUserRole } from '../User/user.interface'

export type TName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TFaculty = {
  id: string
  user: Types.ObjectId
  role: TUserRole
  name: TName
  gender: 'male' | 'female' // literal type
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'AB+' | 'B+' | 'O+' | 'A-' | 'AB-' | 'B-' | 'O-'
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  academicDepartment: Types.ObjectId
  isDeleted: boolean
}
