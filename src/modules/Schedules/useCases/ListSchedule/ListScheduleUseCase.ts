import { inject, injectable } from 'tsyringe'

import { HTTP_STATUS } from '@shared/infra/http/status/http-status'

import { IResponse, ResponseService } from '@services/Response/ResponseService'
import { IScheduleRepository } from '@modules/Schedules/repositories/IScheduleRepository'
import { ScheduleListMap } from '@modules/Schedules/mapper/ScheduleListMap'

export interface IRequestListSchedule {
  user_id: string
  team_id: string
  shift_id: string
  schedule_date: string
  month: number
  is_home?: string
  order?: string
  records?: number
  page?: number
}

@injectable()
class ListScheduleUseCase {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  async execute({
    user_id,
    team_id,
    shift_id,
    schedule_date,
    month,
    order,
    is_home,
    records,
    page = 1
  }: IRequestListSchedule): Promise<IResponse> {
    const schedule = await this.scheduleRepository.List({
      user_id,
      team_id,
      shift_id,
      schedule_date,
      month,
      is_home,
      order,
      records,
      page
    })

    if (!schedule.success) {
      return ResponseService.setResponseJson({
        status: HTTP_STATUS.BAD_REQUEST,
        message: schedule.message,
        success: schedule.success
      })
    }

    const data =
      schedule.data.length > 0 ? ScheduleListMap.ToDTO(schedule.data) : []

    return ResponseService.setResponseJson({
      status: data.length > 0 ? HTTP_STATUS.OK : HTTP_STATUS.NO_CONTENT,
      data,
      page: page > 0 ? page : 1,
      records: data.length > 0 ? Number(schedule.data[0].TT_REGI) : 0,
      success: schedule.success
    })
  }
}

export { ListScheduleUseCase }
