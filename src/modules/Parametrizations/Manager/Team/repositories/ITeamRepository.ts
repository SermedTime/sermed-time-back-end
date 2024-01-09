import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateTeamDTO } from '../dtos/ICreateTeamDTO'
import { IParamsListTeam } from '../useCases/ListTeam/ListTeamUseCase'
import { ITeamSQL } from '../infra/SQLServer/interfaces/ITeamSQL'

interface ITeamRepository {
  upsert(data: ICreateTeamDTO): Promise<IResponseRepository>
  list(data: IParamsListTeam): Promise<IResponseRepository<ITeamSQL>>
  findById(uuid: string): Promise<IResponseRepository<ITeamSQL>>
}

export { ITeamRepository }
