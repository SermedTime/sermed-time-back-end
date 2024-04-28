import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IWorkingDayRepository } from '../../repositories/IWorkingDayRepository'
import {
  IDetailsWorkingDay,
  WorkingDayDetailsMap
} from '../../mapper/WorkingDayDetailsMap'

@injectable()
class DetailsWorkingDayUseCase {
  constructor(
    @inject('WorkingDayRepository')
    private workingDayRepository: IWorkingDayRepository
  ) {}

  async execute(uuid: string): Promise<IResponse> {
    const workingDay = await this.workingDayRepository.findById(uuid)

    if (!workingDay.success) {
      return ResponseService.setResponseJson({
        data: workingDay.message,
        status: HTTP_STATUS.BAD_REQUEST,
        success: false
      })
    }

    const data: IDetailsWorkingDay =
      workingDay.data.length > 0
        ? WorkingDayDetailsMap.toDTO(workingDay.data[0])
        : ({} as IDetailsWorkingDay)

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.OK,
      success: workingDay.success,
      page: 1,
      records: workingDay.data.length
    })
  }
}

export { DetailsWorkingDayUseCase }
