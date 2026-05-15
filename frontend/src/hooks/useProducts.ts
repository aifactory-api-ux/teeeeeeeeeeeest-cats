import { useState, useCallback } from 'react';
import api, { ApiError } from '../utils/api';
import { Product, ProductCreate } from '../types';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  createProduct: (data: ProductCreate) => Promise<Product>;
  updateProduct: (id: number, data: ProductCreate) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Product[]>('/products');
      setProducts(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch products');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (data: ProductCreate): Promise<Product> => {
    const product = await api.post<Product>('/products', data);
    setProducts(prev => [...prev, product]);
    return product;
  }, []);

  const updateProduct = useCallback(async (id: number, data: ProductCreate): Promise<Product> => {
    const product = await api.put<Product>(`/products/${id}`, data);
    setProducts(prev => prev.map(p => p.id === id ? product : p));
    return product;
  }, []);

  const deleteProduct = useCallback(async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  return { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct };
}