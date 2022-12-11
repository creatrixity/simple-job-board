import type { Knex } from "knex";
import appConfig from "./src/config";
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      user: "postgres",
      password: "5uperIn5ecurePa55word",
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  testing: {
    client: "postgresql",
    connection: {
      user: "postgres",
      password: "5uperIn5ecurePa55word",
      host: appConfig.database.host,
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
