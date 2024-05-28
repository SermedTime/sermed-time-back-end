import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IJobTimeSheet } from '@jobs/UpdateTimeSheet/IJobTimeSheet'

import { ConvertTextToArrayRegisters } from '@utils/Register'
import { ITimeClockRepository } from '../../repositories/ITimeClockRepository'

@injectable()
class UpdateTimeSheetUseCase {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository,
    @inject('JobTimeSheet')
    private jobTimeSheet: IJobTimeSheet
  ) {}

  async execute(uuid: string): Promise<IResponse> {
    const timeClock = await this.timeClockRepository.findById(uuid)

    if (!timeClock.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: timeClock.success,
        message: timeClock.message
      })
    }

    if (timeClock.data.length > 0) {
      const updateTimeSheet = {
        timeClockIp: timeClock.data[0].IP_RELO_PONT.split('.')
          .map(octet => parseInt(octet, 10).toString())
          .join('.'),
        lastRegister: timeClock.data[0].NR_ULTI_MARC
      }

      const params = await this.jobTimeSheet.getParams(
        updateTimeSheet.timeClockIp,
        Number(updateTimeSheet.lastRegister)
      )

      if (params.session) {
        const time_sheet = await this.jobTimeSheet.getTimeSheet(
          params,
          updateTimeSheet.timeClockIp
        )

        const registers = ConvertTextToArrayRegisters(time_sheet, uuid)

        await this.jobTimeSheet.saveRegister(registers)
      } else {
        return ResponseService.setResponseJson({
          status: HTTP_STATUS.BAD_REQUEST,
          success: false,
          message:
            'Houve um erro no comportamento da aplicação verifique se o IP está correto e tente novamente!'
        })
      }
    }

    return ResponseService.setResponseJson({
      data: uuid,
      status: HTTP_STATUS.OK,
      success: timeClock.success,
      create: true
    })
  }
}

export { UpdateTimeSheetUseCase }
