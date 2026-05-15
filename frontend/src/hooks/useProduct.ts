import { useState, useCallback } from 'react';
import api, { ApiError } from '../utils/api';
import { Product } from '../types';

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
  fetchProduct: (id: number) => Promise<void>;
}

export function useProduct(): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Product>(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch product');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { product, loading, error, fetchProduct };
}