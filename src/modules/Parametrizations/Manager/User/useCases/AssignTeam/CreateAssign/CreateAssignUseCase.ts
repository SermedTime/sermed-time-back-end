import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IAssignTeamRepository } from '../../../repositories/IAssignTeamRepository'

interface IRequest {
  user_id: string
  team_id: string
  is_supervisor: string
  userId: string
}

@injectable()
class CreateAssignUseCase {
  constructor(
    @inject('AssignTeamRepository')
    private assignTeamRepository: IAssignTeamRepository
  ) {}

  async execute({
    user_id,
    team_id,
    is_supervisor,
    userId
  }: IRequest): Promise<IResponse> {
    const membeship = await this.assignTeamRepository.Create({
      user_id,
      team_id,
      is_supervisor: is_supervisor === 'active' ? 1 : 0,
      user_action: userId
    })

    if (!membeship.success) {
      return ResponseService.setResponseJson({
        success: membeship.success,
        message: membeship.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const data = membeship.data[0].UUID_USUA_X_EQUI

    return ResponseService.setResponseJson({
      data,
      success: membeship.success,
      status: HTTP_STATUS.CREATED,
      create: true
    })
  }
}

export { CreateAssignUseCase }
