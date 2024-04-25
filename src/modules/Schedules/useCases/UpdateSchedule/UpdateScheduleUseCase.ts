import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { IScheduleRepository } from '@modules/Schedules/repositories/IScheduleRepository'
import { ICreateScheduleDTO } from '@modules/Schedules/dto/ICreateScheduleDTO'

@injectable()
class UpdateScheduleUseCase {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  async execute({
    shift_id,
    user_action,
    id
  }: Omit<
    ICreateScheduleDTO,
    'user_id' | 'team_id' | 'schedule_date'
  >): Promise<IResponse> {
    const schedule = await this.scheduleRepository.Update({
      shift_id,
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

    const data = schedule.data[0].UUID_ESCA

    return ResponseService.setResponseJson({
      data,
      status: HTTP_STATUS.CREATED,
      success: schedule.success,
      create: true
    })
  }
}

export { UpdateScheduleUseCase }
