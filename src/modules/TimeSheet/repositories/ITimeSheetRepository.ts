import { IResponseRepository } from 'services/Response/interfaces'

import { ICreateRegisterDTO } from '../dto/ICreateRegisterDTO'
import { IUpdateOvertimeDTO } from '../dto/IUpdateOvertimeDTO'
import { IListTimeSheetParams } from '../useCases/ListTimeSheet/ListTimeSheetUseCase'
import { ITimeSheetListRegistersSQL } from '../infra/interfaces'
import { IUpdateTimeSheetUserDTO } from '../dto/IUpdateTimeSheetUserDTO'

interface ITimeSheetRepository {
  Create(data: ICreateRegisterDTO): Promise<IResponseRepository>
  List(
    data: IListTimeSheetParams
  ): Promise<IResponseRepository<ITimeSheetListRegistersSQL>>
  CalculateHoursWorked(): Promise<IResponseRepository<any>>
  UpdateOvertime(data: IUpdateOvertimeDTO): Promise<IResponseRepository>
  UpdateTimeSheetUser(
    data: IUpdateTimeSheetUserDTO
  ): Promise<IResponseRepository>
}

export { ITimeSheetRepository }
