import { inject, injectable } from 'tsyringe'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUserDetails, UserDetailsMap } from '../../mapper/UserDetailsMap'

@injectable()
class DetailsUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(uuid: string): Promise<IResponse> {
    const user = await this.usersRepository.findById(uuid)

    if (!user.success) {
      return ResponseService.setResponseJson({
        success: user.success,
        message: user.message,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    const data: IUserDetails =
      user.data.length > 0
        ? UserDetailsMap.toDTO(user.data[0])
        : ({} as IUserDetails)

    return ResponseService.setResponseJson({
      data,
      success: user.success,
      status: data ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      page: 1,
      records: data ? 1 : 0
    })
  }
}

export { DetailsUserUseCase }
