import { inject, injectable } from 'tsyringe'

import { IHomeSummaryRepository } from '@modules/Home/repositories/IHomeSummaryRepository'
import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { HTTP_STATUS } from '@shared/infra/http/status/http-status'
import { OvertimeAndAbsenceMap } from '@modules/Home/mapper/OvertimeAndAbsenceMap'

@injectable()
class OvertimeAndAbsenceSummaryUseCase {
  constructor(
    @inject('HomeSummaryRepository')
    private homeSummaryRepository: IHomeSummaryRepository
  ) {}

  async execute(userId: string): Promise<IResponse> {
    const summary =
      await this.homeSummaryRepository.getOvertimeAndAbsenceSummary(userId)

    if (!summary.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        success: summary.success,
        message: summary.message
      })
    }

    const data = OvertimeAndAbsenceMap.toDTO(summary.data[0])

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.OK,
      data: {
        summary: data
      },
      page: 1,
      records: 1,
      success: summary.success
    })
  }
}

export { OvertimeAndAbsenceSummaryUseCase }
