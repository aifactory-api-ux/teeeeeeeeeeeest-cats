export const ORDER_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'] as const;

export const USER_ROLES = ['admin', 'user'] as const;

export const CATEGORIES = ['electronics', 'clothing', 'home', 'sports', 'books', 'toys', 'food'] as const;

export const JWT_EXPIRES_IN = '1d';

export const PORT = 23001;

export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '25432');
export const POSTGRES_USER = process.env.POSTGRES_USER || 'user';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'pass';
export const POSTGRES_DB = process.env.POSTGRES_DB || 'db';

export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '26379');