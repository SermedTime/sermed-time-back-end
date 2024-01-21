import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateAssignTeamDTO } from '../dtos/ICreateAssignTeamDTO'

interface IAssignTeamRepository {
  Create(data: ICreateAssignTeamDTO): Promise<IResponseRepository>
}

export { IAssignTeamRepository }
