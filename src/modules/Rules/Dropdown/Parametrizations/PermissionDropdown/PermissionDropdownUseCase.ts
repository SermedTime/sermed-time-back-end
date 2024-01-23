import { IAssignPermissionRepository } from '@modules/Parametrizations/Manager/User/repositories/IAssignPermissionRepository'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IDropdown } from 'services/Response/interfaces'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
}

@injectable()
class PermissionDropdownUseCase {
  constructor(
    @inject('AssignPermissionRepository')
    private assignPermissionRepository: IAssignPermissionRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const permissions =
      await this.assignPermissionRepository.findPermissions(user_id)

    if (!permissions.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: permissions.message,
        success: permissions.success
      })
    }

    const data: IDropdown[] =
      permissions.data.length > 0
        ? permissions.data.map(i => {
            return {
              description: i.NM_PERM,
              uuid: i.UUID_PERM
            }
          })
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: 1,
      records: data.length,
      success: permissions.success
    })
  }
}

export { PermissionDropdownUseCase }
