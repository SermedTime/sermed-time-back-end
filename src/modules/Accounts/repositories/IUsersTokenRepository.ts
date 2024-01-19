import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateRecoverPassToken } from '../dtos/ICreateRecoverPassToken'
import { IChangePassSQL } from '../infra/SQLServer/interfaces/IChangePassSQL'

interface IUsersTokenRepository {
  create({
    token,
    user_id,
    expires_date
  }: ICreateRecoverPassToken): Promise<IResponseRepository>
  findByToken(token: string): Promise<IResponseRepository<IChangePassSQL>>
}

export { IUsersTokenRepository }
