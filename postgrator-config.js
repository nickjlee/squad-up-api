require('dotenv').config();

module.exports = {
  "migrationDirectory": "migrations",
  "driver": "pg",
  "host": process.env.MIGRATION_DB_HOST,
  "port": process.env.MIGRATION_DB_PORT,
  "database": process.env.MIGRATION_DB_NAME || 'squadup',
  "username": process.env.MIGRATION_DB_USER || 'squadup',
  "password": process.env.MIGRATION_DB_PASS || 'password'
}
