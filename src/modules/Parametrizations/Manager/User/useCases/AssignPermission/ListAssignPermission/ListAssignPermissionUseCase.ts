import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IAssignPermissionRepository } from '../../../repositories/IAssignPermissionRepository'

import { AssignPermissionMap } from '../../../mapper/AssignPermissionMap'

export interface IRequestAssignPermission
  extends Omit<IManagerFilters, 'search' | 'searchingBy' | 'status'> {
  is_writer: string
  user_id: string
}

@injectable()
class ListAssignPermissionUseCase {
  constructor(
    @inject('AssignPermissionRepository')
    private assignPermissionRepository: IAssignPermissionRepository
  ) {}

  async execute({
    user_id,
    is_writer,
    order,
    page = 1,
    records = 1
  }: IRequestAssignPermission): Promise<IResponse> {
    const permissionsAssigned = await this.assignPermissionRepository.List({
      user_id,
      is_writer,
      order,
      page,
      records
    })

    if (!permissionsAssigned.success) {
      return ResponseService.setResponseJson({
        success: permissionsAssigned.success,
        message: permissionsAssigned.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const data =
      permissionsAssigned.data.length > 0
        ? AssignPermissionMap.ToDTO(permissionsAssigned.data)
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: page > 0 ? page : 1,
      records:
        data.length > 0 ? Number(permissionsAssigned.data[0].TT_REGI) : 0,
      success: permissionsAssigned.success
    })
  }
}

export { ListAssignPermissionUseCase }
