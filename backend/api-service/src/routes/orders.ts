import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.post('/', authenticate, orderController.createOrder);
router.get('/', authenticate, orderController.getOrders);
router.get('/:id', authenticate, orderController.getOrderById);

export default router;

/*
  Order routes: createOrder, getOrders, getOrderById
  POST /api/orders - creates order from cart, 400 if empty cart, 401 without JWT
  GET /api/orders - returns order history for user
  GET /api/orders/:id - returns order if owner, 403 if other user's order, 404 if not found
  All routes require authenticate middleware (JWT)
*/