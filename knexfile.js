require("dotenv").config();
localPgConnection = {
  client: "localhost"
};

const dbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/choremonkey.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: dbConnection + "?ssl=true",

    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    }
  }
};
