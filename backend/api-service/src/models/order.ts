import { pool } from '../config/db';
import { Order, CartItem } from '../shared/types';
import { ORDER_STATUSES } from '../shared/constants';

export async function createOrder(userId: number, items: CartItem[], total: number, status: string = 'pending'): Promise<Order> {
  if (!ORDER_STATUSES.includes(status as any)) {
    throw new Error('Invalid status');
  }

  const result = await pool.query(
    `INSERT INTO orders (userId, items, total, status) VALUES ($1, $2, $3, $4) RETURNING *`,
    [userId, JSON.stringify(items), total, status]
  );
  return result.rows[0];
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
  const result = await pool.query(
    'SELECT * FROM orders WHERE userId = $1 ORDER BY createdAt DESC',
    [userId]
  );
  return result.rows;
}

export async function getOrderById(orderId: number): Promise<Order | null> {
  const result = await pool.query('SELECT * FROM orders WHERE id = $1', [orderId]);
  return result.rows[0] || null;
}