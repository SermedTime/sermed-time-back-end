import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IUnitRepository } from '../../repositories/IUnitRepository'
import { ICreateUnitDTO } from '../../dtos/ICreateUnitDTO'

@injectable()
class CreateUnitUseCase {
  constructor(
    @inject('UnitRepository')
    private unitRepository: IUnitRepository
  ) {}

  async execute({
    unitName,
    streetName,
    streetNumber,
    complement,
    neighborhood,
    city,
    state,
    zipCode,
    ibgeCode,
    status,
    user_action
  }: ICreateUnitDTO): Promise<IResponse> {
    const in_stat = status ? (status === 'active' ? 1 : 0) : null

    const unit = await this.unitRepository.upsert({
      unitName,
      streetName,
      streetNumber,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      ibgeCode,
      status: in_stat,
      user_action
    })

    if (!unit.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: unit.success,
        message: unit.message
      })
    }

    const data = unit.data[0].UUID_UNID

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.CREATED,
      success: true,
      create: true,
      data
    })
  }
}

export { CreateUnitUseCase }
