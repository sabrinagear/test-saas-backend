require("dotenv").config();
var localPg = require("pg");

localPg = {
  host: "localhost",
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
  port: process.env.dbPort,
  defaults: {
    ssl: true
  }
};
const dbConnection = process.env.DATABASE_URL;

module.exports = {
  development: {
    client: "pg",
    connection: dbConnection + "?ssl=true",
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: dbConnection + "?ssl=true",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  }
};
