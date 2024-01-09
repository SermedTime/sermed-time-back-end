import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateTeamDTO } from '../dtos/ICreateTeamDTO'

interface ITeamRepository {
  upsert(data: ICreateTeamDTO): Promise<IResponseRepository>
}

export { ITeamRepository }
