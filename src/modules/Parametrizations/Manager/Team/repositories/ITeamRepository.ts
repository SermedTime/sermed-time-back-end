import { IResponseRepository } from 'services/Response/interfaces'
import { IRequestTeamsDropdown } from '@modules/Rules/Dropdown/Parametrizations/TeamDropdown/TeamDropdownUseCase'
import { ICreateTeamDTO } from '../dtos/ICreateTeamDTO'
import { IParamsListTeam } from '../useCases/ListTeam/ListTeamUseCase'
import { ITeamSQL } from '../infra/SQLServer/interfaces/ITeamSQL'

interface ITeamRepository {
  upsert(data: ICreateTeamDTO): Promise<IResponseRepository>
  list(data: IParamsListTeam): Promise<IResponseRepository<ITeamSQL>>
  findById(uuid: string): Promise<IResponseRepository<ITeamSQL>>
  findAll({
    allTeams,
    user_id,
    unitId
  }: IRequestTeamsDropdown): Promise<IResponseRepository<ITeamSQL>>
  getTeamByUser(
    teamLeadId: string,
    onlyTeamLead: boolean
  ): Promise<IResponseRepository<ITeamSQL>>
}

export { ITeamRepository }
