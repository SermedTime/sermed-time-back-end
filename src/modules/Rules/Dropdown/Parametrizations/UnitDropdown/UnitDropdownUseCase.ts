import { inject, injectable } from 'tsyringe'

import { IUnitRepository } from '@modules/Parametrizations/Manager/Unit/repositories/IUnitRepository'
import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IDropdown } from 'services/Response/interfaces'

interface IRequestUnitDropdown {
  all: string
}

@injectable()
class UnitDropdownUseCase {
  constructor(
    @inject('UnitRepository')
    private unitRepository: IUnitRepository
  ) {}

  async execute({ all }: IRequestUnitDropdown): Promise<IResponse> {
    const units = await this.unitRepository.list({
      status: all === 'true' ? null : 'active'
    })

    if (!units.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: units.message,
        success: units.success
      })
    }

    const data: IDropdown[] =
      units.data.length > 0
        ? units.data.map(i => {
            return {
              description: i.NM_UNID,
              uuid: i.UUID_UNID
            }
          })
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: 1,
      records: data.length,
      success: units.success
    })
  }
}

export { UnitDropdownUseCase, IRequestUnitDropdown }
