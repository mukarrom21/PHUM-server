import { Types } from 'mongoose'

export type TName = {
  firstName: string
  middleName: string
  lastName: string
}

export type TAdmin = {
  id: string
  user: Types.ObjectId
  name: TName
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'AB+' | 'B+' | 'O+' | 'A-' | 'AB-' | 'B-' | 'O-'
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  isDeleted: boolean
}
