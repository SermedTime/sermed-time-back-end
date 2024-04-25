import { inject, injectable } from 'tsyringe'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { IDropdown } from 'services/Response/interfaces'
import { ICityRepository } from '../../repositories/ICityRepository'

@injectable()
class CityDropdownUseCase {
  constructor(
    @inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute(state: string): Promise<IResponse> {
    const cities = await this.cityRepository.dropdown(state)

    if (!cities.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: cities.message,
        success: cities.success
      })
    }

    const data: IDropdown[] =
      cities.data.length > 0
        ? cities.data.map(i => {
            return {
              description: i.NM_MUNI,
              uuid: i.UUID_MUNI
            }
          })
        : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: 1,
      records: data.length,
      success: cities.success
    })
  }
}

export { CityDropdownUseCase }
