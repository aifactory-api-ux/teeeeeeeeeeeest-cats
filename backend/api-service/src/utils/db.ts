import { Pool } from 'pg';
import { runMigrations, seedDatabase } from '../config/db';

let pool: Pool;

export function getDbConnection(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

export async function initializeDatabase(): Promise<void> {
  await runMigrations();
  await seedDatabase();
}

export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
  }
}