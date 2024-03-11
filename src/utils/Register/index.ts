import { ICreateRegisterDTO } from '@modules/TimeSheet/dto/ICreateRegisterDTO'

export function ConvertTextToArrayRegisters(
  text: string,
  time_clock_uuid: string
): ICreateRegisterDTO[] {
  const data = text.split('\n')

  const registers_array = data
    .filter((line: string) => !line.includes('txt') && line[9] === '3')
    .map((line: string) => line.replace(/\r/g, ''))

  const registers: ICreateRegisterDTO[] = registers_array.map((r: string) => {
    return {
      appointment_number: Number(r.substring(0, 9).replace(/^0+/, '')),
      appointment_date: new Date(
        Number(r.substring(14, 18)),
        Number(r.substring(12, 14)) - 1,
        Number(r.substring(10, 12)),
        Number(r.substring(18, 20)),
        Number(r.substring(20, 22))
      ),
      pis: r.substring(22, 34),
      crc16: r.substring(34, 38),
      time_clock_uuid
    }
  })

  return registers
}
