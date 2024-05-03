import { IWorkingDayRepository } from '@modules/Parametrizations/Manager/WorkingDay/repositories/IWorkingDayRepository'
import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { IDropdown } from '@services/Response/interfaces'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { inject, injectable } from 'tsyringe'

@injectable()
export class WorkingDayDropdownUseCase {
  constructor(
    @inject('WorkingDayRepository')
    private workingDayRepository: IWorkingDayRepository
  ) {}

  async execute(): Promise<IResponse> {
    const list = await this.workingDayRepository.findOptionsDropdown()

    if (!list.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: list.message,
        success: list.success
      })
    }

    const mappedList: Array<IDropdown> =
      list?.data?.map(item => ({
        description: item.NM_JORN_TRAB,
        uuid: item.UUID_JORN_TRAB
      })) || []

    return ResponseService.setResponseJson({
      status: mappedList.length ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data: mappedList,
      page: 1,
      success: list.success,
      records: mappedList.length
    })
  }
}
