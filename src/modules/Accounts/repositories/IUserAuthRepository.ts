import { IResponseRepository } from 'services/Response/interfaces'
import { IUserAuthSQL } from '../infra/SQLServer/interfaces/IUserAuthSQL'

interface IUserAuthRepository {
  findByEmail(email: string): Promise<IResponseRepository<IUserAuthSQL>>
}

export { IUserAuthRepository }
