import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from 'services/Response/ResponseService'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IAssignTeamRepository } from '../../../repositories/IAssignTeamRepository'

interface IRequest {
  assign_id: string
  userId: string
}

@injectable()
class DeleteAssignUseCase {
  constructor(
    @inject('AssignTeamRepository')
    private assignTeamRepository: IAssignTeamRepository
  ) {}

  async execute({ userId, assign_id }: IRequest): Promise<IResponse> {
    const membeship = await this.assignTeamRepository.Delete({
      assign_id,
      user_action: userId
    })

    if (!membeship.success) {
      return ResponseService.setResponseJson({
        success: membeship.success,
        message: membeship.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    return ResponseService.setResponseJson({
      success: membeship.success,
      status: HTTP_STATUS.OK,
      create: true
    })
  }
}

export { DeleteAssignUseCase }
