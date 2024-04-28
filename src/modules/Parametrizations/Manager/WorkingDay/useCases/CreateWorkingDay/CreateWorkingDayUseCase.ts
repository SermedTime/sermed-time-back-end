import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IWorkingDayRepository } from '../../repositories/IWorkingDayRepository'
import { ICreateWorkingDayDTO } from '../../dtos/ICreateWorkingDayDTO'

@injectable()
class CreateWorkingDayUseCase {
  constructor(
    @inject('WorkingDayRepository')
    private workingDayRepository: IWorkingDayRepository
  ) {}

  async execute({
    workingDayName,
    status,
    userAction
  }: Omit<ICreateWorkingDayDTO, 'uuid'>): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const workingDay = await this.workingDayRepository.upsert({
      workingDayName,
      status: in_stat,
      userAction
    })

    if (!workingDay.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: workingDay.success,
        message: workingDay.message
      })
    }

    const data = workingDay.data[0].UUID_JORN_TRAB

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.CREATED,
      success: true,
      create: true,
      data
    })
  }
}

export { CreateWorkingDayUseCase }
