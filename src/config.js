'use strict';

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://squadup:password@localhost/squadup',
  JWT_SECRET: process.env.JWT_SECRET || 'ocarina of time',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}