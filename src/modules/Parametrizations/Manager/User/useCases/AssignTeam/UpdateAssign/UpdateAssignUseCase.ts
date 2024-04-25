import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IAssignTeamRepository } from '../../../repositories/IAssignTeamRepository'

interface IRequest {
  assign_id: string
  is_supervisor: string
  userId: string
}

@injectable()
class UpdateAssignUseCase {
  constructor(
    @inject('AssignTeamRepository')
    private assignTeamRepository: IAssignTeamRepository
  ) {}

  async execute({
    is_supervisor,
    userId,
    assign_id
  }: IRequest): Promise<IResponse> {
    const in_supe = is_supervisor === 'active' ? 1 : 0

    const membeship = await this.assignTeamRepository.Update({
      assign_id,
      is_supervisor: in_supe,
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
      status: HTTP_STATUS.OK,
      create: true
    })
  }
}

export { UpdateAssignUseCase }
