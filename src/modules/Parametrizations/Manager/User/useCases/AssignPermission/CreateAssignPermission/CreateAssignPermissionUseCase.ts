import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IAssignPermissionRepository } from '../../../repositories/IAssignPermissionRepository'
import { ICreateAssignPermissionDTO } from '../../../dtos/ICreateAssignPermissionDTO'

interface IRequest
  extends Omit<ICreateAssignPermissionDTO, 'is_writer' | 'uuid'> {
  is_writer: string
}

@injectable()
class CreateAssignPermissionUseCase {
  constructor(
    @inject('AssignPermissionRepository')
    private assignPermissionRepository: IAssignPermissionRepository
  ) {}

  async execute({
    is_writer,
    permission_id,
    user_action,
    user_id
  }: IRequest): Promise<IResponse> {
    const assigned = await this.assignPermissionRepository.Create({
      is_writer: is_writer === 'active' ? 1 : 0,
      permission_id,
      user_action,
      user_id
    })

    if (!assigned.success) {
      return ResponseService.setResponseJson({
        success: assigned.success,
        message: assigned.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const data = assigned.data[0].UUID_USUA_X_PERM

    return ResponseService.setResponseJson({
      data,
      success: assigned.success,
      status: HTTP_STATUS.CREATED,
      create: true
    })
  }
}

export { CreateAssignPermissionUseCase }
