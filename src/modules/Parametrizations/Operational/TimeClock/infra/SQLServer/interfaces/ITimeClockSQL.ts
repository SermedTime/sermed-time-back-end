export interface ITimeClockSQL {
  UUID_RELO_PONT: string
  NM_RELO_PONT: string
  IP_RELO_PONT: string
  UUID_UNID: string
  DS_UNID: string
  NM_SETO: string
  NM_FABR: string
  NM_MODE: string
  NR_ULTI_MARC: string
  DT_ULTI_REGI: string
  DT_CRIA: string
  ID_USUA_CRIA: string
  UUID_USUA_CRIA: string
  NM_USUA_CRIA: string
  DT_ATUA: string
  ID_USUA_ATUA: string
  UUID_USUA_ATUA: string
  NM_USUA_ATUA: string
  IN_STAT: string
  TT_REGI: number
}

export interface ITimeClockRegister {
  ID_RELO_PONT: string
  UUID_RELO_PONT: string
  IP_RELO_PONT: string
  NR_ULTI_MARC: number
}
