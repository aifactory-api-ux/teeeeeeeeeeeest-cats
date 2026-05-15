import { pool } from '../config/db';
import { User } from '../shared/types';

// Email has UNIQUE constraint in database
export async function createUser(email: string, passwordHash: string, name: string): Promise<User> {
  const result = await pool.query(
    `INSERT INTO users (email, passwordHash, name) VALUES ($1, $2, $3) RETURNING *`,
    [email, passwordHash, name]
  );
  return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}