import type { Knex } from 'knex';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const development: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, '../../../dev.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, '../migrations'),
    extension: 'ts'
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds')
  },
  pool: {
    afterCreate: async (done: any, connection: any) => {
      await connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};
export const production = {
  ...development
};
