import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { ITimeSheetRepository } from '@modules/TimeSheet/repositories/ITimeSheetRepository'
import { IUpdateTimeSheetUserDTO } from '@modules/TimeSheet/dto/IUpdateTimeSheetUserDTO'
import { IResponse, ResponseService } from '@services/Response/ResponseService'

@injectable()
class UpdateTimeSheetUseCase {
  constructor(
    @inject('TimeSheetRepository')
    private timeSheetRepository: ITimeSheetRepository
  ) {}

  async execute({
    timeSheetId,
    date,
    firstEntry,
    firstExit,
    secondEntry,
    secondExit,
    thirdEntry,
    thirdExit,
    userAction,
    userId
  }: IUpdateTimeSheetUserDTO): Promise<IResponse> {
    const timeSheet = await this.timeSheetRepository.UpdateTimeSheetUser({
      timeSheetId,
      date,
      firstEntry,
      firstExit,
      secondEntry,
      secondExit,
      thirdEntry,
      thirdExit,
      userAction,
      userId
    })

    if (!timeSheet.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: timeSheet.success,
        message: timeSheet.message
      })
    }

    const data = timeSheet.data[0].UUID_RESU_HORA

    return ResponseService.setResponseJson({
      status: timeSheetId ? HTTP_STATUS.OK : HTTP_STATUS.CREATED,
      success: true,
      create: true,
      data
    })
  }
}

export { UpdateTimeSheetUseCase }
