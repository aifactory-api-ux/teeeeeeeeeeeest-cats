import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;

/*
  Product route fields: id, name, description, price, imageUrl, stock, category, createdAt, updatedAt
  GET /api/products - returns list of products with pagination and search
  GET /api/products/:id - get single product
  POST /api/products - create product
  PUT /api/products/:id - update product
  DELETE /api/products/:id - delete product
  Pagination: page, limit query params
  Search: search query param for filtering by name
  Validation: 400 BadRequest for invalid params
  Empty result: returns empty array
*/