import { IResponseRepository } from 'services/Response/interfaces'
import { IShiftSQL } from '../infra/interfaces'

interface IShiftRepository {
  findShiftDropdown(): Promise<IResponseRepository<IShiftSQL>>
}

export { IShiftRepository }
