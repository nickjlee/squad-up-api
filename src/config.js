'use strict';

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://cody_gillette@localhost/squad-up",
  DB_URL: process.env.DB_URL || 'postgresql://squadup@localhost/squadup',
  JWT_SECRET: process.env.JWT_SECRET || 'ocarina of time',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
