import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateRecoverPassToken } from '../dtos/ICreateRecoverPassToken'

interface IUsersTokenRepository {
  create({
    token,
    user_id,
    expires_date
  }: ICreateRecoverPassToken): Promise<IResponseRepository>
}

export { IUsersTokenRepository }
