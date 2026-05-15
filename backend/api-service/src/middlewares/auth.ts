import { Request, Response, NextFunction } from 'express';
import { verifyJwt, JwtPayload } from '../utils/jwt';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = parts[1];

  try {
    const payload = verifyJwt(token);
    (req as Request & { user?: JwtPayload }).user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}