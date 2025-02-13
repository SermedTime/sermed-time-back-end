import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import { ITeamRepository } from '../../repositories/ITeamRepository'
import { IListTeam, TeamMap } from '../../mapper/TeamMap'

export interface IParamsListTeam extends IManagerFilters {
  unit?: string
}

@injectable()
class ListTeamUseCase {
  constructor(
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
    unit
  }: IParamsListTeam): Promise<IResponse<IListTeam>> {
    const team = await this.teamRepository.list({
      order,
      page,
      records,
      search,
      searchingBy,
      status,
      unit
    })

    if (!team.success) {
      return ResponseService.setResponseJson<IListTeam>({
        status: HTTP_STATUS.BAD_REQUEST,
        success: team.success,
        message: team.message
      })
    }

    const data = team.data.length > 0 ? TeamMap.ToDTO(team.data) : []

    return ResponseService.setResponseJson<IListTeam>({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(team.data[0].TT_REGI) : 0,
      success: team.success
    })
  }
}

export { ListTeamUseCase }
