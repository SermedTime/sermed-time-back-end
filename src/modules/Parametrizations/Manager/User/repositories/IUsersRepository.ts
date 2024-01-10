import { IResponseRepository } from 'services/Response/interfaces'
import { IParamsListUsers } from '../useCases/ListUsers/ListUsersUseCase'
import { IUserSQL } from '../infra/SQLServer/interfaces'

interface IUsersRepository {
  list(data: IParamsListUsers): Promise<IResponseRepository<IUserSQL>>
}

export { IUsersRepository }
