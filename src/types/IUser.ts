import { IUserRoleEnum } from './enums/IUserRoleEnum'

export interface IUser {
  _id: string
  name: string
  email: string
  phone?: string
  image?: string
  type: IUserRoleEnum
  company_position: 'editor' | 'viewer' | ''
  createdAt: string
}
