import { inject, injectable } from 'tsyringe'
import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ITeamRepository } from '@modules/Parametrizations/Manager/Team/repositories/ITeamRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersList, UsersListMap } from '../../mapper/UsersListMap'

export interface IParamsListUsers extends IManagerFilters {
  companyId: string
  unitId: string
  teamId: string
  onlyTeam: boolean
  teamLeadId?: string
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('TeamRepository')
    private teamRepository: ITeamRepository
  ) {}

  async execute({
    order,
    page = 1,
    records = 1,
    search,
    searchingBy,
    status,
    companyId,
    unitId,
    teamId,
    onlyTeam,
    teamLeadId
  }: IParamsListUsers): Promise<IResponse<IUsersList>> {
    let teamForTeamLead: string | undefined

    if (onlyTeam) {
      const teams = await this.teamRepository.getTeamByUser(teamLeadId, true)

      if (!teams.success) {
        return ResponseService.setResponseJson({
          success: teams.success,
          message: teams.message,
          status: HTTP_STATUS.BAD_REQUEST
        })
      }

      if (teams.data.length === 0) {
        return ResponseService.setResponseJson({
          status: HTTP_STATUS.NO_CONTENT,
          data: [],
          page: 1,
          records: 0,
          success: teams.success
        })
      }

      teamForTeamLead = teams.data.map(team => team.UUID_EQUI).join(',')
    }

    const users = await this.usersRepository.list({
      order,
      page,
      records,
      search,
      searchingBy,
      status,
      companyId,
      unitId,
      teamId: onlyTeam
        ? teamForTeamLead.includes(teamId)
          ? teamId
          : teamForTeamLead
        : teamId
    })

    if (!users.success) {
      return ResponseService.setResponseJson({
        success: users.success,
        message: users.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const data = users.data.length > 0 ? UsersListMap.ToDTO(users.data) : []

    return ResponseService.setResponseJson<IUsersList>({
      status: HTTP_STATUS.OK,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(users.data[0].TT_REGI) : 0,
      success: users.success
    })
  }
}

export { ListUsersUseCase }
