import { inject, injectable } from 'tsyringe'

import { ITimeSheetRepository } from '@modules/TimeSheet/repositories/ITimeSheetRepository'
import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { TimeSheetRegisterMap } from '@modules/TimeSheet/mapper/TimeSheetRegisterMap'

export interface IListTimeSheetParams {
  user_id: string
  year: number
  month: number
  page: number
  isHome: string
}

@injectable()
class ListTimeSheetUseCase {
  constructor(
    @inject('TimeSheetRepository')
    private timeSheetRepository: ITimeSheetRepository
  ) {}

  async execute({
    user_id,
    year,
    month,
    page,
    isHome
  }: IListTimeSheetParams): Promise<IResponse> {
    const registers = await this.timeSheetRepository.List({
      user_id,
      year,
      month,
      page,
      isHome
    })

    if (!registers.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: registers.message,
        success: registers.success
      })
    }

    const data =
      registers.data.length > 0
        ? TimeSheetRegisterMap.ToDTO(registers.data)
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: page > 0 ? page : 1,
      success: registers.success,
      records: data.length > 0 ? registers.data[0].TT_REGI : 0
    })
  }
}

export { ListTimeSheetUseCase }
