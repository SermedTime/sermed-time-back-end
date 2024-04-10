import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IUnitRepository } from '../../repositories/IUnitRepository'
import { IUnitDetails, UnitDetailsMap } from '../../mapper/UnitDetailsMap'

@injectable()
class DetailsUnitUseCase {
  constructor(
    @inject('UnitRepository')
    private unitRepository: IUnitRepository
  ) {}

  async execute(uuid: string): Promise<IResponse> {
    const unit = await this.unitRepository.findById(uuid)

    if (!unit.success) {
      return ResponseService.setResponseJson({
        data: unit.message,
        status: HTTP_STATUS.BAD_REQUEST,
        success: false
      })
    }

    const data: IUnitDetails =
      unit.data.length > 0
        ? UnitDetailsMap.toDTO(unit.data[0])
        : ({} as IUnitDetails)

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.OK,
      success: unit.success,
      page: 1,
      records: unit.data.length
    })
  }
}

export { DetailsUnitUseCase }
