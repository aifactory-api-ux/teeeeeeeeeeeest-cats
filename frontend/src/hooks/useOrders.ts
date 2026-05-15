import { useState, useCallback } from 'react';
import api, { ApiError } from '../utils/api';
import { Order } from '../types';

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  createOrder: () => Promise<Order>;
  fetchOrder: (id: number) => Promise<Order>;
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get<Order[]>('/orders');
      setOrders(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch orders');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (): Promise<Order> => {
    const order = await api.post<Order>('/orders');
    setOrders(prev => [...prev, order]);
    return order;
  }, []);

  const fetchOrder = useCallback(async (id: number): Promise<Order> => {
    return api.get<Order>(`/orders/${id}`);
  }, []);

  return { orders, loading, error, fetchOrders, createOrder, fetchOrder };
}