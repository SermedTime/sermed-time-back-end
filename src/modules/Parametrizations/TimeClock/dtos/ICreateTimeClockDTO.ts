interface ICreateTimeClockDTO {
  uuid?: string
  city: string
  clock_ip: string
  manufacturer: string
  model: string
  name: string
  sector: string
  state: string
  status: string | number
  unit: string
}

export { ICreateTimeClockDTO }
