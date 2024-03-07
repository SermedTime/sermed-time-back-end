interface ICreateRegisterDTO {
  user_uuid: string
  time_clock_uuid: string
  appointment_number: number
  appointment_date: string
  appointment_time: string
  crc16: string
}

export { ICreateRegisterDTO }
