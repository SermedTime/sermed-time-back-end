import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { IDropdown } from 'services/Response/interfaces'

import { IUsersRepository } from '@modules/Parametrizations/Manager/User/repositories/IUsersRepository'

interface IRequest {
  team_id: string
}

@injectable()
class UsersDropdownUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ team_id }: IRequest): Promise<IResponse> {
    const users = await this.usersRepository.findByTeamId(team_id)

    if (!users.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: users.message,
        success: users.success
      })
    }

    const data: IDropdown[] =
      users.data.length > 0
        ? users.data.map(i => {
            return {
              description: i.NM_USUA,
              uuid: i.UUID_USUA
            }
          })
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: 1,
      records: data.length,
      success: users.success
    })
  }
}

export { UsersDropdownUseCase }
