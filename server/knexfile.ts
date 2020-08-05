import { Config } from 'knex';
import path from 'path';

const config: Config = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'db', 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
  },
  useNullAsDefault: true,
};

module.exports = config;
