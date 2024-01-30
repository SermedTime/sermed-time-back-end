import { IResponseRepository } from 'services/Response/interfaces'

import { ICreateScheduleDTO } from '../dto/ICreateScheduleDTO'

import { IRequestListSchedule } from '../useCases/ListSchedule/ListScheduleUseCase'

interface IScheduleRepository {
  Create(data: Omit<ICreateScheduleDTO, 'id'>): Promise<IResponseRepository>
  List(data: IRequestListSchedule): Promise<IResponseRepository>
  Update(
    data: Omit<ICreateScheduleDTO, 'user_id' | 'team_id' | 'schedule_date'>
  ): Promise<IResponseRepository>
  Delete(
    data: Omit<
      ICreateScheduleDTO,
      'user_id' | 'team_id' | 'schedule_date' | 'shift_id'
    >
  ): Promise<IResponseRepository>
}

export { IScheduleRepository }
