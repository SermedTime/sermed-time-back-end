interface ICreateRegisterDTO {
  pis: string
  time_clock_uuid: string
  appointment_number: number
  appointment_date: Date
  appointment_time: string
  crc16: string
}

export { ICreateRegisterDTO }
