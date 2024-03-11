import { ITimeClockRepository } from '@modules/Parametrizations/Manager/TimeClock/repositories/ITimeClockRepository'
import { ICreateRegisterDTO } from '@modules/TimeSheet/dto/ICreateRegisterDTO'
import { ITimeSheetRepository } from '@modules/TimeSheet/repositories/ITimeSheetRepository'
import { ConvertTextToArrayRegisters } from '@utils/Register'
import { post } from 'services/api/Control_id'
import { auth } from 'services/api/Control_id/auth'
import { inject, injectable } from 'tsyringe'

@injectable()
class JobTimeSheet {
  constructor(
    @inject('TimeClockRepository')
    private timeClockRepository: ITimeClockRepository,
    @inject('TimeSheetRepository')
    private timeSheetRepository: ITimeSheetRepository
  ) {}

  async UpdateTimeSheet(): Promise<void> {
    const { data } = await this.timeClockRepository.listIps()

    try {
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

          const registers = ConvertTextToArrayRegisters(
            time_sheet,
            item.uuid_time_clock
          )

          await this.saveRegister(registers)
        }
      })
    } catch (err) {
      console.log(err.message)
    }
  }

  async getParams(ipConnection: string): Promise<Record<string, any>> {
    let params = {} as Record<string, any>
    try {
      const {
        data: { session }
      } = await auth({ baseURL: ipConnection })

      const date = new Date()

      params = session && {
        session,
        initial_date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        }
      }
    } catch (err) {
      console.error(err)
    }

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

  async saveRegister(data: ICreateRegisterDTO[]): Promise<void> {
    data.forEach(async item => {
      await this.timeSheetRepository.Create(item).then(data => {
        if (data.success) {
          console.log(data)
        } else {
          console.error(
            `${item.appointment_number} - ${item.time_clock_uuid} - ${data.message}`
          )
        }
      })
    })
  }
}

export { JobTimeSheet }
