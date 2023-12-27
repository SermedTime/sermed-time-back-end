import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: 'oracle-db',
  port: 1521,
  username: 'localadmin',
  password: 'LocalAdmin123',
  database: 'XE',
  serviceName: 'xepdb1',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts']
})
