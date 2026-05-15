import { Pool } from 'pg';
import { config } from './index';

export const pool = new Pool({
  host: config.postgres.host,
  port: config.postgres.port,
  user: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
});

export async function runMigrations(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        imageUrl VARCHAR(255),
        stock INTEGER DEFAULT 0,
        category VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        userId INTEGER REFERENCES users(id),
        items JSONB NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
      CREATE INDEX IF NOT EXISTS idx_orders_userId ON orders(userId);
    `);
  } finally {
    client.release();
  }
}

export async function seedDatabase(): Promise<void> {
  const productCount = await pool.query('SELECT COUNT(*) FROM products');
  if (parseInt(productCount.rows[0].count) === 0) {
    const seedProducts = [
      { name: 'Laptop Pro 15', description: 'High-performance laptop', price: 1299.99, imageUrl: 'https://example.com/laptop.png', stock: 10, category: 'electronics' },
      { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', price: 29.99, imageUrl: 'https://example.com/mouse.png', stock: 50, category: 'electronics' },
      { name: 'USB-C Cable', description: 'Fast charging cable', price: 15.99, imageUrl: 'https://example.com/cable.png', stock: 100, category: 'electronics' },
      { name: 'Running Shoes', description: 'Lightweight running shoes', price: 89.99, imageUrl: 'https://example.com/shoes.png', stock: 25, category: 'sports' },
      { name: 'Coffee Maker', description: 'Automatic coffee machine', price: 79.99, imageUrl: 'https://example.com/coffee.png', stock: 15, category: 'home' },
    ];

    for (const product of seedProducts) {
      await pool.query(
        'INSERT INTO products (name, description, price, imageUrl, stock, category) VALUES ($1, $2, $3, $4, $5, $6)',
        [product.name, product.description, product.price, product.imageUrl, product.stock, product.category]
      );
    }
  }
}

export { pool as db };