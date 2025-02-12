import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/db/dev.sqlite'
  },
  migrations: {
    directory: './src/db/migrations',
    extension: 'ts'
  },
  useNullAsDefault: true
};

export default config;
