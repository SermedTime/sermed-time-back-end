import { IWorkingTimeDetails } from '../useCases/DetailsWorkingTime/DetailsWorkingTimeUseCase'

interface IRegisterWorkingTimeDTO {
  userAction: string
  workingDayId: string
  workingTime: IWorkingTimeDetails[]
}

export { IRegisterWorkingTimeDTO }
