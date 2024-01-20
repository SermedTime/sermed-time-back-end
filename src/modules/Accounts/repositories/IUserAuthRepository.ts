import { IResponseRepository } from 'services/Response/interfaces'
import {
  IUserAuthSQL,
  IUserOldPass
} from '../infra/SQLServer/interfaces/IUserAuthSQL'

export interface IChangePass {
  uuid_usua: string
  password: string
  uuid_token?: string
  is_reset: 0 | 1
  user_action: string
}

interface IUserAuthRepository {
  findByEmail(email: string): Promise<IResponseRepository<IUserAuthSQL>>
  changePassword(data: IChangePass): Promise<IResponseRepository>
  getPasswordById(userId: string): Promise<IResponseRepository<IUserOldPass>>
}

export { IUserAuthRepository }
