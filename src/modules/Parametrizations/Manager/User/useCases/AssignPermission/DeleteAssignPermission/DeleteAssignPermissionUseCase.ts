import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IAssignPermissionRepository } from '../../../repositories/IAssignPermissionRepository'
import { ICreateAssignPermissionDTO } from '../../../dtos/ICreateAssignPermissionDTO'

interface IRequest
  extends Omit<
    ICreateAssignPermissionDTO,
    'is_writer' | 'permission_id' | 'user_id'
  > {}

@injectable()
class DeleteAssignPermissionUseCase {
  constructor(
    @inject('AssignPermissionRepository')
    private assignPermissionRepository: IAssignPermissionRepository
  ) {}

  async execute({ uuid, user_action }: IRequest): Promise<IResponse> {
    const assigned = await this.assignPermissionRepository.Delete({
      uuid,
      user_action
    })

    if (!assigned.success) {
      return ResponseService.setResponseJson({
        success: assigned.success,
        message: assigned.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    return ResponseService.setResponseJson({
      success: assigned.success,
      status: HTTP_STATUS.OK,
      create: true
    })
  }
}

export { DeleteAssignPermissionUseCase }
