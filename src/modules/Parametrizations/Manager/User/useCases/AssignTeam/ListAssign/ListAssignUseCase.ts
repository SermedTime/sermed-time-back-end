import { inject, injectable } from 'tsyringe'
import { IManagerFilters } from '@modules/Parametrizations/Manager/shared/interfaces'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IAssignTeamRepository } from '../../../repositories/IAssignTeamRepository'
import { AssignTeamMap, IAssignTeamList } from '../../../mapper/AssignTeamMap'

export interface IRequest extends IManagerFilters {
  user_id: string
  is_supervisor: string
}

@injectable()
class ListAssignUseCase {
  constructor(
    @inject('AssignTeamRepository')
    private assignTeamRepository: IAssignTeamRepository
  ) {}

  async execute({
    user_id,
    is_supervisor,
    order,
    page = 1,
    records = 1
  }: IRequest): Promise<IResponse<IAssignTeamList>> {
    const membership = await this.assignTeamRepository.List({
      user_id,
      is_supervisor,
      order,
      page,
      records
    })

    if (!membership.success) {
      return ResponseService.setResponseJson({
        success: membership.success,
        message: membership.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const data =
      membership.data.length > 0 ? AssignTeamMap.ToDTO(membership.data) : []

    return ResponseService.setResponseJson<IAssignTeamList>({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(membership.data[0].TT_REGI) : 0,
      success: membership.success
    })
  }
}

export { ListAssignUseCase }
