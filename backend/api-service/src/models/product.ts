import { pool } from '../config/db';
import { Product, ProductCreate } from '../shared/types';

export async function createProduct(data: ProductCreate): Promise<Product> {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, imageUrl, stock, category)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [data.name, data.description, data.price, data.imageUrl, data.stock, data.category]
  );
  return result.rows[0];
}

export async function getProductById(id: number): Promise<Product | null> {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getAllProducts(
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<Product[]> {
  const offset = (page - 1) * limit;
  let query = 'SELECT * FROM products';
  const params: (string | number)[] = [];

  if (search) {
    query += ' WHERE name ILIKE $1';
    params.push(`%${search}%`);
  }

  query += ` ORDER BY createdAt DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);
  return result.rows;
}

export async function updateProduct(id: number, data: ProductCreate): Promise<Product | null> {
  const result = await pool.query(
    `UPDATE products SET name = $1, description = $2, price = $3, imageUrl = $4, stock = $5, category = $6, updatedAt = CURRENT_TIMESTAMP
     WHERE id = $7 RETURNING *`,
    [data.name, data.description, data.price, data.imageUrl, data.stock, data.category, id]
  );
  return result.rows[0] || null;
}

export async function deleteProduct(id: number): Promise<boolean> {
  const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
  // Returns false if no rows deleted (product not found)
  return result.rowCount !== null && result.rowCount > 0;
}

export async function productExists(id: number): Promise<boolean> {
  const result = await pool.query('SELECT 1 FROM products WHERE id = $1', [id]);
  return result.rowCount !== null && result.rowCount > 0;
}