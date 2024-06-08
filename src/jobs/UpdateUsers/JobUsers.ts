import CryptoJS from 'crypto-js'

import { getSagePool } from '@shared/infra/database/config.sage'
import { IRecordSet, IResult } from 'mssql'
import { getPool } from '@shared/infra/database/config'
import { IUsersRepository } from '@modules/Parametrizations/Manager/User/repositories/IUsersRepository'
import { inject, injectable } from 'tsyringe'
import { randonPasswordGenerate } from '@utils/RandonPasswordGenerate'
import { hash } from 'bcrypt'
import { IJobUsers, ISysUser, IUserSage } from './IJobUsers'

@injectable()
class JobUsers implements IJobUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async executeJob() {
    const sysUsers = await this.getSysUsers()
    const sageUsers = await this.getUsers()

    sageUsers.forEach(async sageUser => {
      const sageUserMd5 = CryptoJS.MD5(JSON.stringify(sageUser)).toString(
        CryptoJS.enc.Hex
      )

      const sysUser = sysUsers.find(
        user => String(user.NR_IDEN_USUA) === String(sageUser.NR_IDEN_FUNC)
      )

      if (!sysUser) {
        const pass = await randonPasswordGenerate(12)

        const hashPass = await hash(pass, 8)

        const userInsert = await this.usersRepository.create({
          isJob: true,
          admissionDate: sageUser.DT_ADMI,
          companyIdErp: Number(sageUser.ID_EMPR_REF_ERP),
          cpf: String(sageUser.NR_CPF.replace(/\D/g, '')),
          ctps: String(sageUser.NR_CTPS),
          email: String(sageUser.DS_MAIL),
          employeeCode: String(sageUser.NR_IDEN_FUNC),
          name: String(sageUser.NM_COMP),
          payrollNumber: String(sageUser.NR_FOLH_PAGA),
          pis: String(sageUser.NR_PIS.replace(/\D/g, '')),
          position: String(sageUser.DS_FUNCA),
          socialName: String(sageUser.NM_SOCI),
          status: sageUser.DT_DEMI ? 0 : 1,
          resignationDate: sageUser.DT_DEMI,
          hash: sageUserMd5,
          action_user: process.env.USER_ACTION,
          password: hashPass
        })

        if (userInsert.success) {
          console.log('insert')
          console.log(userInsert.data)
        } else {
          console.log(sageUser.NR_CPF)
          console.log(sageUser.NR_CTPS)
          console.log(userInsert.message)
        }
      } else if (
        sageUserMd5 !== sysUser.CD_HASH ||
        sageUser.ID_EMPR_REF_ERP !== sysUser.ID_EMPR_REFE_ERP
      ) {
        const userUpdate = await this.usersRepository.update({
          uuid: sysUser.UUID_USUA,
          isJob: true,
          admissionDate: sageUser.DT_ADMI,
          companyIdErp: Number(sageUser.ID_EMPR_REF_ERP),
          cpf: String(sageUser.NR_CPF.replace(/\D/g, '')),
          ctps: String(sageUser.NR_CTPS),
          email: String(sageUser.DS_MAIL),
          employeeCode: String(sageUser.NR_IDEN_FUNC),
          name: String(sageUser.NM_COMP),
          payrollNumber: String(sageUser.NR_FOLH_PAGA),
          pis: String(sageUser.NR_PIS.replace(/\D/g, '')),
          position: String(sageUser.DS_FUNCA),
          socialName: String(sageUser.NM_SOCI),
          status: sageUser.DT_DEMI ? 0 : 1,
          hash: sageUserMd5,
          resignationDate: sageUser.DT_DEMI,
          action_user: process.env.USER_ACTION
        })

        if (userUpdate.success) {
          console.log('update')
          console.log(userUpdate.data)
        } else {
          console.log(userUpdate.message)
        }
      } else {
        console.log(
          `Não há alterações no usuário ${sageUser.NM_COMP?.trim()} Matrícula: ${sageUser.NR_IDEN_FUNC}`
        )
      }
    })
  }

  async getUsers(): Promise<IRecordSet<IUserSage>> {
    let users: IRecordSet<IUserSage>

    try {
      const query = `
      SELECT 
           D.CPF							      AS NR_CPF
          ,F.nomecompleto					  AS NM_COMP
          ,F.nome_social					  AS NM_SOCI
          ,F.email						      AS DS_MAIL
          ,F.cd_empresa					    AS ID_EMPR_REF_ERP
          ,FUN.descricao_completa		AS DS_FUNCA
          ,FFUN.nr_registro				  AS NR_FOLH_PAGA		
          ,F.cd_funcionario				  AS NR_IDEN_FUNC
          ,D.pis							      AS NR_PIS
          ,D.nr_carteira					  AS NR_CTPS
          ,FFUN.dt_admissao				  AS DT_ADMI
          ,R.dt_desligamento				AS DT_DEMI
      FROM Funcionario		F
      JOIN FunDocumento		D		    ON F.cd_funcionario = D.cd_funcionario AND F.cd_empresa = D.cd_empresa
      OUTER APPLY(
        SELECT TOP(1) *
        FROM FunFuncao
        WHERE cd_funcionario = F.cd_funcionario AND cd_empresa = F.cd_empresa
        ORDER BY dt_funcao DESC
      ) FF
      JOIN Funcao				    FUN		ON FUN.cd_funcao = FF.cd_funcao AND FUN.enterprise_id = FF.cd_empresa
      JOIN FunFuncional		  FFUN	ON F.cd_funcionario = FFUN.cd_funcionario AND F.cd_empresa = FFUN.cd_empresa
      LEFT JOIN Rescisao		R		  ON F.cd_funcionario = R.cd_funcionario AND F.cd_empresa = R.cd_empresa
      WHERE 
            F.cd_empresa = 1 
        AND F.email IS NOT NULL
        AND FFUN.nr_registro IS NOT NULL
      ORDER BY F.cd_empresa DESC
      `

      const sagePool = await getSagePool()

      const result: IResult<IUserSage> = await sagePool.request().query(query)

      users = result.recordset
    } catch (err) {
      throw new Error(err)
    }
    return users
  }

  async getSysUsers(): Promise<IRecordSet<ISysUser>> {
    let users: IRecordSet<ISysUser>

    const query = `
    SELECT
       U.UUID		        AS UUID_USUA
      ,U.NR_IDEN_USUA	  AS NR_IDEN_USUA
      ,E.ID_REFE_ERP    AS ID_EMPR_REFE_ERP
      ,U.CD_HASH	      AS CD_HASH
    FROM
         TB_USUA U
    JOIN TB_EMPR E ON U.ID_EMPR = E.ID
    WHERE
      ID > 1
    `

    try {
      const pool = getPool()

      const result = await pool.request().query(query)

      users = result.recordset
    } catch (err) {
      throw new Error(err)
    }

    return users
  }
}

export { JobUsers }
