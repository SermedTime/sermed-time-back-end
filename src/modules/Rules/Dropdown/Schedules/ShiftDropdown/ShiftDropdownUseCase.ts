import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { IShiftRepository } from '@modules/Schedules/repositories/IShiftRepository'
import { IDropdown } from 'services/Response/interfaces'

@injectable()
class ShiftDropdownUseCase {
  constructor(
    @inject('ShiftRepository')
    private shiftRepository: IShiftRepository
  ) {}

  async execute(): Promise<IResponse> {
    const shifts = await this.shiftRepository.findShiftDropdown()

    if (!shifts.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: shifts.message,
        success: shifts.success
      })
    }

    const data: IDropdown[] =
      shifts.data.length > 0
        ? shifts.data.map(i => {
            return {
              description: `${i.NM_TURN} - ${i.SG_TURN}`,
              uuid: i.UUID_TURN
            }
          })
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: 1,
      records: data.length,
      success: shifts.success
    })
  }
}

export { ShiftDropdownUseCase }
