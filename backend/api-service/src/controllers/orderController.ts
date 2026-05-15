import { Request, Response } from 'express';
import * as orderModel from '../models/order';
import * as cartModel from '../models/cart';
import * as productModel from '../models/product';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as Request & { user?: { userId: number } }).user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const cart = await cartModel.getCartByUserId(user.userId);

    if (cart.items.length === 0) {
      res.status(400).json({ error: 'Cart is empty' });
      return;
    }

    let total = 0;
    for (const item of cart.items) {
      const product = await productModel.getProductById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    const order = await orderModel.createOrder(user.userId, cart.items, total);

    await cartModel.clearCart(user.userId);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getOrders(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as Request & { user?: { userId: number } }).user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const orders = await orderModel.getOrdersByUserId(user.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getOrderById(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as Request & { user?: { userId: number } }).user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const orderId = parseInt(req.params.id);
    const order = await orderModel.getOrderById(orderId);

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    if (order.userId !== user.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}