import sql, { ConnectionPool, config } from 'mssql'

let sagePool: ConnectionPool = null

const sqlSageConfig: config = {
  user: process.env.DB_SAGE_USER,
  password: process.env.DB_SAGE_PWD,
  database: process.env.DB_SAGE_NAME,
  server: process.env.DB_SAGE_HOST,
  port: Number(process.env.DB_SAGE_PORT),
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustServerCertificate: true
  }
}

export async function getSagePool(): Promise<ConnectionPool> {
  if (!sagePool) {
    try {
      const newConnection = new sql.ConnectionPool(sqlSageConfig)
      sagePool = await newConnection.connect()
    } catch (e) {
      throw new Error(`Error connecting to the database: ${e.message}`)
    }
  }

  if (!sagePool.connected) {
    try {
      await sagePool.connect()
    } catch (e) {
      throw new Error(`Error reconnecting to the database: ${e.message}`)
    }
  }

  return sagePool
}

export async function closeSagePool(): Promise<void> {
  if (sagePool) {
    await sagePool.close()
    sagePool = null
  }
}
