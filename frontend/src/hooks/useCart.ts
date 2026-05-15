import { useState, useCallback } from 'react';
import api, { ApiError } from '../utils/api';
import { Cart } from '../types';

interface UseCartReturn {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<Cart>;
  updateCartItem: (productId: number, quantity: number) => Promise<Cart>;
  removeFromCart: (productId: number) => Promise<Cart>;
  clearCart: () => Promise<void>;
}

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Cart>('/cart');
      setCart(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch cart');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (productId: number, quantity: number): Promise<Cart> => {
    const updatedCart = await api.post<Cart>('/cart/items', { productId, quantity });
    setCart(updatedCart);
    return updatedCart;
  }, []);

  const updateCartItem = useCallback(async (productId: number, quantity: number): Promise<Cart> => {
    const updatedCart = await api.put<Cart>(`/cart/items/${productId}`, { quantity });
    setCart(updatedCart);
    return updatedCart;
  }, []);

  const removeFromCart = useCallback(async (productId: number): Promise<Cart> => {
    const updatedCart = await api.delete<Cart>(`/cart/items/${productId}`);
    setCart(updatedCart);
    return updatedCart;
  }, []);

  const clearCart = useCallback(async () => {
    if (!cart) return;
    for (const item of cart.items) {
      await api.delete(`/cart/items/${item.productId}`);
    }
    setCart({ ...cart, items: [] });
  }, [cart]);

  return { cart, loading, error, fetchCart, addToCart, updateCartItem, removeFromCart, clearCart };
}