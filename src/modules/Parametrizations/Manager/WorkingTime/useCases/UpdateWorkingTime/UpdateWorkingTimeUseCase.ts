import { inject, injectable } from 'tsyringe'
import { ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IWorkingTimeRepository } from '../../repositories/IWorkingTimeRepository'
import { IRegisterWorkingTimeDTO } from '../../dtos/IRegisterWorkingTimeDTO'

@injectable()
class UpdateWorkingTimeUseCase {
  constructor(
    @inject('WorkingTimeRepository')
    private workingTimeRepository: IWorkingTimeRepository
  ) {}

  async execute({
    userAction,
    workingDayId,
    workingTime
  }: IRegisterWorkingTimeDTO) {
    const response = await this.workingTimeRepository.upsert({
      userAction,
      workingDayId,
      workingTime
    })

    if (!response.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: response.success,
        message: response.message
      })
    }

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.OK,
      success: true,
      create: true
    })
  }
}

export { UpdateWorkingTimeUseCase }
