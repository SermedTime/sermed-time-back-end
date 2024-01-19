import { IResponseRepository } from 'services/Response/interfaces'
import { IUserAuthSQL } from '../infra/SQLServer/interfaces/IUserAuthSQL'

export interface IChangePass {
  uuid_usua: string
  password: string
  uuid_token?: string
}

interface IUserAuthRepository {
  findByEmail(email: string): Promise<IResponseRepository<IUserAuthSQL>>
  changePassword(data: IChangePass): Promise<IResponseRepository>
}

export { IUserAuthRepository }
