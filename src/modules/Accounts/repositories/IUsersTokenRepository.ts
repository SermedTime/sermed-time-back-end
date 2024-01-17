// import { IResponse } from 'services/Response/ResponseService'
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO'

interface IUsersTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id
  }: ICreateUserTokenDTO): Promise<string>
}

export { IUsersTokenRepository }
