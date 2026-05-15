export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegister {
  email: string;
  password: string;
  name: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}