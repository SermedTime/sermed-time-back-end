import { inject, injectable } from 'tsyringe'

import { IJobTimeSheet } from '@jobs/UpdateTimeSheet/IJobTimeSheet'
import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { ConvertTextToArrayRegisters, base64ToString } from '@utils/Register'
import { ITimeClockRepository } from '../../repositories/ITimeClockRepository'
import { IUploadTimeSheetDTO } from '../../dtos/IUploadTimeSheetDTO'

@injectable()
class UploadTimeSheetUseCase {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository,
    @inject('JobTimeSheet')
    private jobTimeSheet: IJobTimeSheet
  ) {}

  async execute({
    uuid,
    timeSheetFile
  }: IUploadTimeSheetDTO): Promise<IResponse> {
    const timeClock = await this.timeClockRepository.findById(uuid)

    if (!timeClock.success || timeClock.data.length < 1) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    const timeSheet = base64ToString(timeSheetFile)

    const registers = ConvertTextToArrayRegisters(timeSheet, uuid)

    await this.jobTimeSheet.saveRegister(registers)

    return ResponseService.setResponseJson({
      data: uuid,
      status: HTTP_STATUS.OK,
      success: timeClock.success,
      create: true
    })
  }
}

export { UploadTimeSheetUseCase }
