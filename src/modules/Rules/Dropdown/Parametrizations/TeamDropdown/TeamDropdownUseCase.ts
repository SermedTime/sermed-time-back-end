import { inject, injectable } from 'tsyringe'

import { ITeamRepository } from '@modules/Parametrizations/Manager/Team/repositories/ITeamRepository'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IDropdown } from 'services/Response/interfaces'

@injectable()
class TeamDropdownUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository
  ) {}

  async execute(allTeams: string): Promise<IResponse> {
    const teams = await this.teamRepository.findAll(allTeams)

    if (!teams.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: teams.message,
        success: teams.success
      })
    }

    const data: IDropdown[] =
      teams.data.length > 0
        ? teams.data.map(i => {
            return {
              description: i.NM_EQUI,
              uuid: i.UUID_EQUI
            }
          })
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: 1,
      records: data.length,
      success: teams.success
    })
  }
}

export { TeamDropdownUseCase }
