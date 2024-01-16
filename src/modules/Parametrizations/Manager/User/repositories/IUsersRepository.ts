import { IResponseRepository } from 'services/Response/interfaces'
import { IParamsListUsers } from '../useCases/ListUsers/ListUsersUseCase'
import { IUserSQL } from '../infra/SQLServer/interfaces'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

interface IUsersRepository {
  upsert(data: ICreateUserDTO): Promise<IResponseRepository>
  list(data: IParamsListUsers): Promise<IResponseRepository<IUserSQL>>
  findById(uuid: string): Promise<IResponseRepository<IUserSQL>>
}

export { IUsersRepository }
