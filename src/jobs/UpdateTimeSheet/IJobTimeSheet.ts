import { ICreateRegisterDTO } from '@modules/TimeSheet/dto/ICreateRegisterDTO'

interface IJobTimeSheet {
  UpdateTimeSheet(): Promise<void>
  getParams(
    ipConnection: string,
    lastRegister: number
  ): Promise<Record<string, any>>
  getTimeSheet(
    params: Record<string, any>,
    ipConnection: string
  ): Promise<string>
  saveRegister(data: ICreateRegisterDTO[]): Promise<void>
  calculateHoursWorked(): Promise<void>
}

export { IJobTimeSheet }
