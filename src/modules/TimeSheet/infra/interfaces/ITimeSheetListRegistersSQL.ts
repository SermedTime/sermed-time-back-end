interface ITimeSheetListRegistersSQL {
  UUID_RESU_HORA: string
  UUID_USUA: string
  NM_USUA: string
  DT_MARC: Date
  NM_DIA_SEMA: string
  HR_ENTR_1: Date
  HR_SAID_1: Date
  HR_ENTR_2: Date
  HR_SAID_2: Date
  HR_ENTR_3: Date
  HR_SAID_3: Date
  HR_SALD: number
  CD_TIPO_SALD: string
  NM_TIPO_SALD: string
  CD_STAT: string
  NM_STAT: string
  DS_MOTI_REPR: string
  TT_REGI: number
}

export { ITimeSheetListRegistersSQL }
