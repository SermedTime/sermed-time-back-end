import { ITimeClockRepository } from '@modules/Parametrizations/Manager/TimeClock/repositories/ITimeClockRepository'
import { ConvertTextToArrayRegisters } from '@utils/Register'
import { post } from 'services/api/Control_id'
import { auth } from 'services/api/Control_id/auth'
import { inject, injectable } from 'tsyringe'

@injectable()
class JobTimeSheet {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository
  ) {}

  async UpdateTimeSheet(): Promise<void> {
    const { data } = await this.timeClockRepository.listIps()

    const time_clocks =
      data.length > 0
        ? data.map(item => {
            return {
              ip_time_clock: item.IP_RELO_PONT.split('.')
                .map(octet => parseInt(octet, 10).toString())
                .join('.'),
              uuid_time_clock: item.UUID_RELO_PONT
            }
          })
        : []

    time_clocks.forEach(async item => {
      const params = await this.getParams(item.ip_time_clock)

      if (params.session) {
        const time_sheet = await this.getTimeSheet(params, item.ip_time_clock)

        const registers = ConvertTextToArrayRegisters(time_sheet)

        console.log(registers)
      }
    })
  }

  async getParams(ipConnection: string): Promise<Record<string, any>> {
    const {
      data: { session }
    } = await auth({ baseURL: ipConnection })

    const date = new Date()

    const params = session
      ? {
          session,
          initial_date: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
          }
        }
      : ({} as Record<string, any>)

    return params
  }

  async getTimeSheet(
    params: Record<string, any>,
    ipConnection: string
  ): Promise<string> {
    const { data } = await post({
      baseURL: ipConnection,
      path: '/get_afd.fcgi',
      params
    })

    return data
  }
}

export { JobTimeSheet }
