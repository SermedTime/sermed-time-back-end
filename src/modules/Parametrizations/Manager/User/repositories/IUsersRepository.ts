import { IResponseRepository } from 'services/Response/interfaces'
import { IParamsListUsers } from '../useCases/ListUsers/ListUsersUseCase'
import { IUserSQL } from '../infra/SQLServer/interfaces'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<IResponseRepository>
  update(data: ICreateUserDTO): Promise<IResponseRepository>
  list(data: IParamsListUsers): Promise<IResponseRepository<IUserSQL>>
  findById(uuid: string): Promise<IResponseRepository<IUserSQL>>
  findByEmail(email: string): Promise<IResponseRepository<IUserSQL>>
  findByTeamId(team_id: string): Promise<IResponseRepository<IUserSQL>>
}

export { IUsersRepository }
