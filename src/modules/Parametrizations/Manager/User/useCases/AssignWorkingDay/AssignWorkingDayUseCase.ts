import { inject, injectable } from 'tsyringe'
import { ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IUsersRepository } from '../../repositories/IUsersRepository'

export interface IAssignWorkingDay {
  userId: string
  workingDayId: string
  userAction: string
}

@injectable()
class AssignWorkingDayUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ userId, workingDayId, userAction }: IAssignWorkingDay) {
    const user = await this.usersRepository.assignWorkingDay({
      userId,
      workingDayId,
      userAction
    })

    if (!user.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: user.success,
        message: user.message
      })
    }

    const data = user.data[0].UUID_USUA

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.OK,
      success: user.success,
      create: true
    })
  }
}

export { AssignWorkingDayUseCase }
