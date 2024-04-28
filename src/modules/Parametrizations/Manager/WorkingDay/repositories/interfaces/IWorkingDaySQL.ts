interface IWorkingDaySQL {
  UUID_JORN_TRAB: string
  NM_JORN_TRAB: string
  IN_STAT: boolean
  NM_STAT: 'active' | 'inactive'
  UUID_USUA_CRIA: string
  NM_USUA_CRIA: string
  DT_CRIA: string
  UUID_USUA_ATUA: string
  NM_USUA_ATUA: string
  DT_ATUA: string
  TT_REGI: number
}

export { IWorkingDaySQL }
