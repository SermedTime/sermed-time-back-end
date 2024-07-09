import { inject, injectable } from 'tsyringe'

import { uuidValidateV4 } from '@utils/uuidValidateV4'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { IUpdateOvertimeDTO } from '@modules/TimeSheet/dto/IUpdateOvertimeDTO'
import { ITimeSheetRepository } from '@modules/TimeSheet/repositories/ITimeSheetRepository'

@injectable()
class UpdateOverTimeUseCase {
  constructor(
    @inject('TimeSheetRepository')
    private timeSheetRepository: ITimeSheetRepository
  ) {}

  async execute({
    timesheetId,
    overtimeStatus,
    reasorForRejection,
    releaseType,
    userAction
  }: IUpdateOvertimeDTO): Promise<IResponse> {
    if (!uuidValidateV4(timesheetId)) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.NOT_FOUND,
        success: false,
        message: 'ID informado inválido!'
      })
    }

    const overtime = await this.timeSheetRepository.UpdateOvertime({
      timesheetId,
      overtimeStatus,
      reasorForRejection,
      releaseType,
      userAction
    })

    if (!overtime.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: overtime.success,
        message: overtime.message
      })
    }

    const data = overtime.data[0].UUID_RESU_HORA

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.OK,
      success: true,
      create: true,
      data
    })
  }
}

export { UpdateOverTimeUseCase }
