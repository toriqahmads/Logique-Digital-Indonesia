module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEVELOPMENT,
    password: process.env.DB_PASSWORD_DEVELOPMENT,
    database: process.env.DB_DATABASE_DEVELOPMENT,
    host: process.env.DB_HOST_DEVELOPMENT,
    dialect: process.env.DB_DIALECT_DEVELOPMENT
  },
  staging: {
    username: process.env.DB_USERNAME_STAGING,
    password: process.env.DB_PASSWORD_STAGING,
    database: process.env.DB_DATABASE_STAGING,
    host: process.env.DB_HOST_STAGING,
    dialect: process.env.DB_DIALECT_STAGING,
  },
  test: {
    use_env_variable: 'DATA_BASE_TEST',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: process.env.DB_DATABASE_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    dialect: process.env.DB_DIALECT_PRODUCTION,
  },
};
