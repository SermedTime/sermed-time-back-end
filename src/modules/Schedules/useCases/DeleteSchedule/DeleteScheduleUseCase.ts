import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from 'services/Response/ResponseService'
import { IScheduleRepository } from '@modules/Schedules/repositories/IScheduleRepository'
import { ICreateScheduleDTO } from '@modules/Schedules/dto/ICreateScheduleDTO'

@injectable()
class DeleteScheduleUseCase {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  async execute({
    id,
    user_action
  }: Omit<
    ICreateScheduleDTO,
    'user_id' | 'team_id' | 'schedule_date' | 'shift_id'
  >): Promise<IResponse> {
    const schedule = await this.scheduleRepository.Delete({
      id,
      user_action
    })

    if (!schedule.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: schedule.message,
        success: schedule.success
      })
    }

    return ResponseService.setResponseJson({
      status: HTTP_STATUS.CREATED,
      success: schedule.success,
      create: true
    })
  }
}

export { DeleteScheduleUseCase }
