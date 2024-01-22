import sql from 'mssql'
import { closeConnection, createConnection, getPool } from '../config'
import { hash } from 'bcrypt'

async function insertFirstUser() {
  await createConnection()

  const pass = '12345678'

  const hashPass = await hash(pass, 8)

  const user_data = {
    cpf: '00000000000',
    name: 'Administrador',
    socialName: 'Administrador',
    email: 'admin@sermed.com.br',
    password: hashPass,
    companyUuid: null,
    position: 'Administrador',
    payrollNumber: '0000000000',
    employeeCode: '0000000000',
    pis: '00000000000',
    ctps: '00000',
    admissionDate: '04/12/2023',
    resignationDate: null,
    status: 1,
    action_user: null
  }

  const pool = await getPool()

  try {
    const result = await pool
      .request()
      .input('NR_CPF', sql.VarChar(11), user_data.cpf)
      .input('NM_USUA', sql.VarChar(256), user_data.name)
      .input('NM_SOCI_USUA', sql.VarChar(256), user_data.socialName)
      .input('DS_MAIL', sql.VarChar(256), user_data.email)
      .input('DS_PASS', sql.VarChar(128), user_data.password)
      .input('UUID_EMPR', sql.NVarChar(36), user_data.companyUuid)
      .input('DS_FUNC', sql.VarChar(64), user_data.position)
      .input('NR_FOLH_PAGA', sql.VarChar(10), user_data.payrollNumber)
      .input('NR_IDEN_USUA', sql.VarChar(10), user_data.employeeCode)
      .input('NR_PIS', sql.VarChar(11), user_data.pis)
      .input('NR_CTPS', sql.VarChar(5), user_data.ctps)
      .input('DT_ADMI', sql.Date, user_data.admissionDate)
      .input('DT_DEMI', sql.Date, user_data.resignationDate)
      .input('IN_STAT', sql.Bit, user_data.status)
      .input('UUID_USUA_ACAO', sql.NVarChar(36), user_data.action_user)
      .execute('[dbo].[PRC_USUA_GRAV]')

    const { recordset: user } = result

    console.log(`Usuário ${user[0].UUID_USUA} criado com sucesso!`)
    console.table(user)
  } catch (err) {
    console.log('Não foi possível criar o usuário')
    console.log(err.message)
  } finally {
    closeConnection()
    process.exit()
  }
}

insertFirstUser()
