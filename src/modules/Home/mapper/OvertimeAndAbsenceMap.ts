import { IOvertimeAndAbsenceSummarySQL } from '../infra/SQLServer/interfaces/IOvertimeAndAbsenceSummarySQL'

interface IOvertimeAndAbsenceSummary {
  absencesInMonth: number
  overtimeInMonth: string
  annualLeave: string
}

class OvertimeAndAbsenceMap {
  static toDTO(
    data: IOvertimeAndAbsenceSummarySQL
  ): IOvertimeAndAbsenceSummary {
    const summary: IOvertimeAndAbsenceSummary = {
      absencesInMonth: data.QT_FALT || 0,
      overtimeInMonth: data.HT_EXTR || '00:00',
      annualLeave: data.HR_BANC_HORA || '00:00'
    }
    return summary
  }
}

export { OvertimeAndAbsenceMap }
