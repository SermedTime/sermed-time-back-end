import {
  closeConnection,
  closeSageConnection,
  createSageConnection,
  createSermedTimeConnection,
  getSagePool
} from '@shared/infra/database/config'
import { IJobUsers } from './IJobUsers'

class JobUsers implements IJobUsers {
  async getUsers(): Promise<void> {
    try {
      await closeConnection()

      await createSageConnection()

      const pool = await getSagePool()

      const query = `
      SELECT 
	       D.CPF                      AS NR_CPF
	      ,F.nomecompleto             AS NOME
        ,F.nome_social              AS NM_SOCI
	      ,F.email                    AS DS_MAIL
	      ,F.cd_empresa
	      ,FUN.descricao_completa
	      ,FFUN.nr_registro
	      ,F.cd_funcionario
	      ,D.pis
	      ,D.nr_carteira
	      ,FFUN.dt_admissao
	      ,R.dt_desligamento
      FROM Funcionario		F
      JOIN FunDocumento		D		ON F.cd_funcionario = D.cd_funcionario AND F.cd_empresa = D.cd_empresa
      OUTER APPLY(
	        SELECT TOP(1) *
	        FROM FunFuncao
	        WHERE cd_funcionario = F.cd_funcionario AND cd_empresa = F.cd_empresa
	        ORDER BY dt_funcao DESC
        ) FF
      JOIN Funcao				FUN		ON FUN.cd_funcao = FF.cd_funcao AND FUN.enterprise_id = FF.cd_empresa
      JOIN FunFuncional		FFUN	ON F.cd_funcionario = FFUN.cd_funcionario AND F.cd_empresa = FFUN.cd_empresa
      LEFT JOIN Rescisao		R		ON F.cd_funcionario = R.cd_funcionario AND F.cd_empresa = R.cd_empresa
      ORDER BY F.cd_empresa DESC
      `

      const result = await pool.request().query(query)

      console.log(result.recordset[0])
    } catch (err) {
      throw new Error(err)
    } finally {
      await closeSageConnection()

      await createSermedTimeConnection()
    }
  }
}

export { JobUsers }
