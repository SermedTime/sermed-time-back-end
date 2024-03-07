export interface IRegister {
  nsr: string
  type: string
  date: string
  time: string
  pis: string
  crc16: string
}

export function ConvertTextToArrayRegisters(text: string): IRegister[] {
  const data = text.split('\n')

  const registers_array = data
    .filter((line: string) => !line.includes('txt') && line[9] === '3')
    .map((line: string) => line.replace(/\r/g, ''))

  const registers: IRegister[] = registers_array.map((r: string) => {
    return {
      nsr: r.substring(0, 9).replace(/^0+/, ''),
      type: r.substring(9, 10),
      date: `${r.substring(10, 12)}/${r.substring(12, 14)}/${r.substring(
        14,
        18
      )}`,
      time: `${r.substring(18, 20)}:${r.substring(20, 22)}`,
      pis: r.substring(22, 34),
      crc16: r.substring(34, 38)
    }
  })

  return registers
}
