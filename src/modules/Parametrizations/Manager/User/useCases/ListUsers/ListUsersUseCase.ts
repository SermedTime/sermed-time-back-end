import { inject, injectable } from 'tsyringe'
import { IManagerFilters } from '@modules/Parametrizations/shared/interfaces'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersList, UsersListMap } from '../../mapper/UsersListMap'

export interface IParamsListUsers extends IManagerFilters {
  team: string
  unit: string
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    order,
    page = 1,
    records = 1,
    search,
    searchingBy,
    status,
    team,
    unit
  }: IParamsListUsers): Promise<IResponse<IUsersList>> {
    const users = await this.usersRepository.list({
      order,
      page,
      records,
      search,
      searchingBy,
      status,
      team,
      unit
    })

    if (!users.success) {
      return ResponseService.setResponseJson({
        success: users.success,
        message: users.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const data = users.data.length > 0 ? UsersListMap.ToDTO(users.data) : []

    return ResponseService.setResponseJson<IUsersList>({
      status: HTTP_STATUS.OK,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(users.data[0].TT_REGI) : 0,
      success: users.success
    })
  }
}

export { ListUsersUseCase }
