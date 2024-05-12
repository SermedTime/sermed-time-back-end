import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { IWorkingTimeRepository } from '../../repositories/IWorkingTimeRepository'

interface IWorkingTimeDetails {
  day: number
  firstEntry: string
  firstExit: string
  secondEntry: string
  secondExit: string
  thirdEntry: string
  thirdExit: string
}

@injectable()
class DetailsWorkingTimeUseCase {
  constructor(
    @inject('WorkingTimeRepository')
    private workingTimeRepository: IWorkingTimeRepository
  ) {}

  async execute(uuid: string): Promise<IResponse<IWorkingTimeDetails>> {
    const workingTime =
      await this.workingTimeRepository.getWorkingTimeByWorkingDayId(uuid)

    if (!workingTime.success) {
      return ResponseService.setResponseJson({
        data: workingTime.message,
        status: HTTP_STATUS.BAD_REQUEST,
        success: workingTime.success
      })
    }

    const data: IWorkingTimeDetails[] = this.workingTimeRepository.mapDetails(
      workingTime.data
    )

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.OK,
      success: workingTime.success,
      page: 1,
      records: data.length
    })
  }
}

export { DetailsWorkingTimeUseCase, IWorkingTimeDetails }
