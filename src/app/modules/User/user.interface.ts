export type TUserRole = 'admin' | 'student' | 'faculty'
export type TUser = {
  id: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  role: TUserRole
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}
