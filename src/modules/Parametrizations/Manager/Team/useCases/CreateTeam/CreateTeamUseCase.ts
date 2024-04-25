import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ICreateTeamDTO } from '../../dtos/ICreateTeamDTO'
import { ITeamRepository } from '../../repositories/ITeamRepository'

@injectable()
class CreateTeamUseCase {
  constructor(
    @inject('TeamRepository')
    private teamRepository: ITeamRepository
  ) {}

  async execute({
    name,
    unitId,
    status,
    user_action
  }: ICreateTeamDTO): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const team = await this.teamRepository.upsert({
      name,
      unitId,
      status: in_stat,
      user_action
    })

    if (!team.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: team.success,
        message: team.message
      })
    }

    const data = team.data[0].UUID_EQUI

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.CREATED,
      success: team.success,
      create: true
    })
  }
}

export { CreateTeamUseCase }
