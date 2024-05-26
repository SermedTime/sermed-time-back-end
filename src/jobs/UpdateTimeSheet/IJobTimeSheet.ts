import { ICreateRegisterDTO } from '@modules/TimeSheet/dto/ICreateRegisterDTO'

interface IJobTimeSheet {
  UpdateTimeSheet(): Promise<void>
  getParams(
    ipConnection: string,
    lastRegister: number,
    isJob: boolean
  ): Promise<Record<string, any>>
  getTimeSheet(
    params: Record<string, any>,
    ipConnection: string
  ): Promise<string>
  saveRegister(data: ICreateRegisterDTO[]): Promise<void>
}

export { IJobTimeSheet }
