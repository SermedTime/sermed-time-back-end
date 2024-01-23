import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateAssignTeamDTO } from '../dtos/ICreateAssignTeamDTO'
import { IListAssignUseCaseRequest } from '../useCases/AssignTeam/ListAssign/ListAssignUseCase'
import { IAssignTeamSQL } from '../infra/SQLServer/interfaces'

interface IAssignTeamRepository {
  Create(data: ICreateAssignTeamDTO): Promise<IResponseRepository>
  Update(data: ICreateAssignTeamDTO): Promise<IResponseRepository>
  List(
    data: IListAssignUseCaseRequest
  ): Promise<IResponseRepository<IAssignTeamSQL>>
  Delete(data: ICreateAssignTeamDTO): Promise<IResponseRepository>
}

export { IAssignTeamRepository }
