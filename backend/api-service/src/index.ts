import app from './app';
import { config } from './config';
import { initializeDatabase } from './utils/db';
import { connectRedis } from './config/redis';

async function startServer(): Promise<void> {
  try {
    await initializeDatabase();
    console.log('Database initialized');

    try {
      await connectRedis();
      console.log('Redis connected');
    } catch (redisError) {
      console.warn('Redis connection failed, continuing without Redis:', redisError);
    }

    app.listen(config.port, '0.0.0.0', () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();