interface ICreateTimeClockDTO {
  uuid?: string
  clock_ip: string
  manufacturer: string
  model: string
  name: string
  sector: string
  status: string | number
  unit: string
  user_action: string
}

interface IUpdateTimeClockDTO
  extends Partial<Omit<ICreateTimeClockDTO, 'user_action'>> {
  uuid: string
  user_action: string
}
export { ICreateTimeClockDTO, IUpdateTimeClockDTO }
