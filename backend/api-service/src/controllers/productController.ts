import { Request, Response } from 'express';
import * as productModel from '../models/product';
import { ProductCreate } from '../shared/types';

export async function getProduct(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const product = await productModel.getProductById(id);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getProducts(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    if (page < 1 || limit < 1) {
      res.status(400).json({ error: 'Invalid pagination parameters' });
      return;
    }

    const products = await productModel.getAllProducts(page, limit, search);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const data: ProductCreate = req.body;

    if (!data.name || !data.description || data.price === undefined || !data.imageUrl || data.stock === undefined || !data.category) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const product = await productModel.createProduct(data);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const data: ProductCreate = req.body;

    if (!data.name || !data.description || data.price === undefined || !data.imageUrl || data.stock === undefined || !data.category) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const product = await productModel.updateProduct(id, data);

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const deleted = await productModel.deleteProduct(id);

    if (!deleted) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}