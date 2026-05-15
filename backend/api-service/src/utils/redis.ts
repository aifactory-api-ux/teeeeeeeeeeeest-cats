import { createClient, RedisClientType } from 'redis';
import { config } from '../config';

let redisClient: RedisClientType;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({
      socket: {
        host: config.redis.host,
        port: config.redis.port,
      },
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    await redisClient.connect();
  }
  return redisClient;
}

export async function closeRedisClient(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
  }
}