import { ICreateTimeClockDTO } from '../dtos/ICreateTimeClockDTO'

interface ITimeClockRepository {
  create(data: ICreateTimeClockDTO): Promise<string>
}

export { ITimeClockRepository }
