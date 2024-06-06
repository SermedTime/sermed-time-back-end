import sql, { ConnectionPool, config } from 'mssql'

let pool: ConnectionPool = null

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

export function getPool() {
  if (!pool) {
    throw new Error('A conexão com o banco de dados ainda não foi estabelecida')
  }
  return pool
}
