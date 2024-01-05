interface ICreateTimeClockDTO {
  uuid?: string
  city: string
  clock_ip: string
  manufacturer: string
  model: string
  name: string
  sector: string
  state: string
  status: 1 | 0
  unit: string
}

export { ICreateTimeClockDTO }
