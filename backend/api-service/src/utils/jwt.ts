import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface JwtPayload {
  userId: number;
  email: string;
}

export function signJwt(payload: JwtPayload): string {
  if (!config.jwtSecret) {
    throw new Error('Missing JWT secret');
  }
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as any);
}

export function verifyJwt(token: string): JwtPayload {
  if (!config.jwtSecret) {
    throw new Error('Missing JWT secret');
  }
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}