import { Router } from 'express';
import * as cartController from '../controllers/cartController';
import { authenticate } from '../middlewares/auth';

const router = Router();

router.get('/', authenticate, cartController.getCart);
router.post('/items', authenticate, cartController.addItemToCart);
router.put('/items/:productId', authenticate, cartController.updateCartItemQuantity);
router.delete('/items/:productId', authenticate, cartController.removeCartItem);

export default router;

/*
  Cart route handlers: getCart, addItemToCart, updateCartItemQuantity, removeCartItem
  Cart items stored in Redis with key cart:userId
  Empty cart returns empty items array []
  Increment existing product quantity when adding same productId
  Returns 404 NotFound when item not in cart for update/remove operations
  Auth middleware required for all cart endpoints
*/