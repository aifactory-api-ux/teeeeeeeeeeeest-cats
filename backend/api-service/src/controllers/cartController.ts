import { Request, Response } from 'express';
import * as cartModel from '../models/cart';
import * as productModel from '../models/product';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export async function getCart(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as Request & { user?: { userId: number } }).user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const cart = await cartModel.getCartByUserId(user.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function addItemToCart(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as Request & { user?: { userId: number } }).user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { productId, quantity } = req.body;

    if (quantity <= 0) {
      res.status(400).json({ error: 'Invalid quantity' });
      return;
    }

    const exists = await productModel.productExists(productId);
    if (!exists) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const cart = await cartModel.addCartItem(user.userId, productId, quantity);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateCartItemQuantity(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as Request & { user?: { userId: number } }).user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const productId = parseInt(req.params.productId);
    const { quantity } = req.body;

    try {
      const cart = await cartModel.updateCartItemQuantity(user.userId, productId, quantity);
      res.json(cart);
    } catch (error) {
      if (error instanceof Error && error.message === 'Item not found') {
        res.status(404).json({ error: 'Item not found in cart' });
      } else {
        throw error;
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function removeCartItem(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as Request & { user?: { userId: number } }).user;
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const productId = parseInt(req.params.productId);

    try {
      const cart = await cartModel.removeCartItem(user.userId, productId);
      res.json(cart);
    } catch (error) {
      if (error instanceof Error && error.message === 'Item not found') {
        res.status(404).json({ error: 'Item not found in cart' });
      } else {
        throw error;
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}