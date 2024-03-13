import { IResponseRepository } from 'services/Response/interfaces'

import { ICreateRegisterDTO } from '../dto/ICreateRegisterDTO'
import { IListTimeSheetParams } from '../useCases/ListTimeSheet/ListTimeSheetUseCase'
import { ITimeSheetListRegisters } from '../infra/interfaces'

interface ITimeSheetRepository {
  Create(data: ICreateRegisterDTO): Promise<IResponseRepository>
  List(
    data: IListTimeSheetParams
  ): Promise<IResponseRepository<ITimeSheetListRegisters>>
}

export { ITimeSheetRepository }
