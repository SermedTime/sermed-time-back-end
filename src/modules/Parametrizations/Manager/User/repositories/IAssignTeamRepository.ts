import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateAssignTeamDTO } from '../dtos/ICreateAssignTeamDTO'
import { IRequest } from '../useCases/AssignTeam/ListAssign/ListAssignUseCase'
import { IAssignTeamSQL } from '../infra/SQLServer/interfaces'

interface IAssignTeamRepository {
  Create(data: ICreateAssignTeamDTO): Promise<IResponseRepository>
  List(data: IRequest): Promise<IResponseRepository<IAssignTeamSQL>>
}

export { IAssignTeamRepository }
