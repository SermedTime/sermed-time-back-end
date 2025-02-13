import { encryptToPayload } from '@utils/crypt'
import { container } from 'tsyringe'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { IUserAuthSQL } from '../infra/SQLServer/interfaces/IUserAuthSQL'
import { IUserRulesSQL } from '../infra/SQLServer/interfaces/IUserRulesSQL'

interface IRoles {
  permission: string
  is_writer: string
}

interface IUserAuth {
  userUuid: string
  userName: string
  socialName: string
  email: string
  companyName: string
  companyCnpj: string
  teamId: string
  sysPassword: string
  position: string
  pis: string
  identityNumber: string
  cpf: string
  admissionDate: string
  lastUpdateDate: string
  roles?: IRoles[]
}

class UserAuthMap {
  static toDTO(
    data: IUserAuthSQL,
    rules: IUserRulesSQL[],
    teams: string
  ): IUserAuth {
    const dateProvider = container.resolve('DayjsDateProvider') as IDateProvider

    return {
      userUuid: encryptToPayload(data.UUID_USUA),
      userName: encryptToPayload(data.NM_USUA),
      socialName: encryptToPayload(data.NM_SOCI_USUA),
      email: encryptToPayload(data.DS_MAIL),
      companyName: encryptToPayload(data.NM_EMPR),
      companyCnpj: encryptToPayload(data.NR_CNPJ_EMPR),
      teamId: encryptToPayload(teams),
      sysPassword: encryptToPayload(data.IN_SYS_PASS ? 'true' : 'false'),
      position: encryptToPayload(data.DS_FUNC),
      pis: encryptToPayload(data.NR_PIS),
      identityNumber: encryptToPayload(data.NR_IDEN_USUA),
      cpf: encryptToPayload(data.NR_CPF),
      admissionDate: encryptToPayload(dateProvider.convertToUTC(data.DT_ADMI)),
      lastUpdateDate: encryptToPayload(
        dateProvider.convertToUTC(data.DT_ULTI_ATUA)
      ),
      roles:
        rules && rules.length > 0
          ? rules.map(r => {
              return {
                permission: encryptToPayload(r.SG_PERM),
                is_writer: encryptToPayload(r.IN_ESCR ? 'true' : 'false')
              }
            })
          : []
    }
  }
}

export { UserAuthMap, IUserAuth }
