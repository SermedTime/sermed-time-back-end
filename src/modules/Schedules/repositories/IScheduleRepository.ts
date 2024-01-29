import { IResponseRepository } from 'services/Response/interfaces'

import { ICreateScheduleDTO } from '../dto/ICreateScheduleDTO'

import { IRequestListSchedule } from '../useCases/ListSchedule/ListScheduleUseCase'

interface IScheduleRepository {
  Create(data: Omit<ICreateScheduleDTO, 'id'>): Promise<IResponseRepository>
  List(data: IRequestListSchedule): Promise<IResponseRepository>
}

export { IScheduleRepository }
