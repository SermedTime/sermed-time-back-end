import sql, { config } from 'mssql'

let sagePool = null
let pool = null

const sqlSermedTimeConfig: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustServerCertificate: true
  }
}

const sqlSageConfig: config = {
  user: 'sa',
  password: 'S@geBr.2014',
  database: 'Sage_Gestao_Contabil',
  server: '10.10.11.38',
  port: 1434,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustServerCertificate: true
  }
}

export async function createSageConnection() {
  if (sagePool) return sagePool

  try {
    sagePool = await sql.connect(sqlSageConfig)
    console.log('Conexão com o banco de dados Sage estabelecida')
    return sagePool
  } catch (err) {
    throw new Error(err)
  }
}

export async function createSermedTimeConnection() {
  if (pool) return pool

  try {
    pool = await sql.connect(sqlSermedTimeConfig)
    console.log('Conexão com o banco de dados SERMED_TIME estabelecida')
    return pool
  } catch (err) {
    throw new Error(err)
  }
}

export async function closeSageConnection() {
  if (sagePool) {
    try {
      await sagePool.close()
      console.log('Conexão com o banco de dados Sage fechada')
      sagePool = null // Resetar a variável do pool após o fechamento
    } catch (err) {
      console.error(
        'Erro ao fechar a conexão com o banco de dados Sage:',
        err.message
      )
      throw err
    }
  }
}

export async function closeConnection() {
  if (pool) {
    try {
      await pool.close()
      console.log('Conexão com o banco de dados fechada')
      pool = null // Resetar a variável do pool após o fechamento
    } catch (err) {
      console.error(
        'Erro ao fechar a conexão com o banco de dados:',
        err.message
      )
      throw err
    }
  }
}

export function getSagePool() {
  if (!sagePool) {
    throw new Error(
      'A conexão com o banco de dados Sage ainda não foi estabelecida'
    )
  }
  return sagePool
}

export function getPool() {
  if (!pool) {
    throw new Error('A conexão com o banco de dados ainda não foi estabelecida')
  }
  return pool
}
