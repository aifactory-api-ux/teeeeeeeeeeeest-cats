import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['PORT', 'JWT_SECRET'];

for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}

export const config = {
  port: parseInt(process.env.PORT || '23001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '25432'),
    user: process.env.POSTGRES_USER || 'user',
    password: process.env.POSTGRES_PASSWORD || 'pass',
    database: process.env.POSTGRES_DB || 'db',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '26379'),
  },
  swagger: {
    user: process.env.SWAGGER_USER || 'admin',
    pass: process.env.SWAGGER_PASS || 'password',
  },
};