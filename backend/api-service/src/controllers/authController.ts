import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as userModel from '../models/user';
import { signJwt, verifyJwt, JwtPayload } from '../utils/jwt';
import { UserRegister, UserLogin } from '../shared/types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name }: UserRegister = req.body;

    if (!email || !password || !name) {
      res.status(422).json({ error: 'Missing required fields' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(email, passwordHash, name);
    const token = signJwt({ userId: user.id, email: user.email });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: UserLogin = req.body;

    if (!email || !password) {
      res.status(422).json({ error: 'Missing required fields' });
      return;
    }

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = signJwt({ userId: user.id, email: user.email });

    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function me(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyJwt(token);
    const user = await userModel.getUserById(payload.userId);

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}