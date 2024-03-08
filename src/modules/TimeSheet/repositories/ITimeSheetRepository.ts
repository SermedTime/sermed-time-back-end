import { IResponseRepository } from 'services/Response/interfaces'

import { ICreateRegisterDTO } from '../dto/ICreateRegisterDTO'
import { IListTimeSheetParams } from '../useCases/ListTimeSheet/ListTimeSheetUseCase'
import { ITimeSheetRegisteSQL } from '../infra/interfaces'

interface ITimeSheetRepository {
  Create(data: ICreateRegisterDTO): Promise<IResponseRepository>
  List(
    data: IListTimeSheetParams
  ): Promise<IResponseRepository<ITimeSheetRegisteSQL>>
}

export { ITimeSheetRepository }
