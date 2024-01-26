import { IResponseRepository } from 'services/Response/interfaces'
import { ICreateScheduleDTO } from '../dto/ICreateScheduleDTO'

interface IScheduleRepository {
  Create(data: Omit<ICreateScheduleDTO, 'id'>): Promise<IResponseRepository>
}

export { IScheduleRepository }
