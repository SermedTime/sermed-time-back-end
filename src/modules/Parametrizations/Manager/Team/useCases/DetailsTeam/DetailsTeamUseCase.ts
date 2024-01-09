import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ITeamRepository } from '../../repositories/ITeamRepository'
import { ITeamDetailsMap, TeamDetailsMap } from '../../mapper/TeamDetailsMap'

@injectable()
class DetailsTeamUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository
  ) {}

  async execute(uuid: string): Promise<IResponse<ITeamDetailsMap>> {
    const team = await this.teamRepository.findById(uuid)

    if (!team.success) {
      return ResponseService.setResponseJson<ITeamDetailsMap>({
        status: HTTP_STATUS.BAD_REQUEST,
        message: team.message,
        success: team.success
      })
    }

    const data: ITeamDetailsMap =
      team.data.length > 0
        ? TeamDetailsMap.toDTO(team.data[0])
        : ({} as ITeamDetailsMap)

    return ResponseService.setResponseJson<ITeamDetailsMap>({
      data,
      status: team.data ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      success: team.success,
      page: 1,
      records: team.data.length
    })
  }
}

export { DetailsTeamUseCase }
