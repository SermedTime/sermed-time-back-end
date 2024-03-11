interface ICreateRegisterDTO {
  pis: string
  time_clock_uuid: string
  appointment_number: number
  appointment_date: Date
  crc16: string
}

export { ICreateRegisterDTO }
