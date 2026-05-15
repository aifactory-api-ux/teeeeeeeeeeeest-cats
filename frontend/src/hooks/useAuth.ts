import { useState, useCallback } from 'react';
import api, { ApiError } from '../utils/api';
import { User, UserLogin, UserRegister, AuthResponse } from '../types';

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: UserLogin) => Promise<void>;
  register: (data: UserRegister) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (data: UserLogin) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      setToken(response.token);
      setUser(response.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to login');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: UserRegister) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      setToken(response.token);
      setUser(response.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.token);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to register');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }, []);

  const fetchMe = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    setLoading(true);
    setError(null);
    try {
      const userData = await api.get<User>('/auth/me');
      setUser(userData);
      setToken(storedToken);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  return { user, token, loading, error, login, register, logout, fetchMe };
}