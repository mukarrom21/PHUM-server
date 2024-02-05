export interface IUser {
  name: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  role: 'superAdmin' | 'admin' | 'moderator' | 'user'
  status: 'active' | 'blocked'
  isDeleted: boolean
}
