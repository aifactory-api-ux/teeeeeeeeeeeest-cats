import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.me);

export default router;

/*
  Auth routes: register, login, me
  POST /api/auth/register - creates user with hashed password, returns 201 token
  POST /api/auth/login - validates credentials, returns 201 token
  GET /api/auth/me - returns user for valid JWT
  400 for duplicate email
  422 for missing fields
  401 for invalid credentials or invalid JWT
  Token: JWT token returned in response
*/