import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { statusVerify } from '@utils/statusVerify'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ICreateTeamDTO } from '../../dtos/ICreateTeamDTO'
import { ITeamRepository } from '../../repositories/ITeamRepository'

@injectable()
class UpdateTeamUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository
  ) {}

  async execute({ uuid, name, status }: ICreateTeamDTO): Promise<IResponse> {
    const in_stat = statusVerify(status)

    const team = await this.teamRepository.upsert({
      uuid,
      name,
      status: in_stat
    })

    if (!team.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        error: team.message,
        success: team.success
      })
    }

    return ResponseService.setResponseJson({
      data: uuid,
      status: HTTP_STATUS.OK,
      success: team.success,
      create: true
    })
  }
}

export { UpdateTeamUseCase }
