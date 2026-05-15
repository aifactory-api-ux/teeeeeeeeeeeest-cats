import { createContext, useContext, ReactNode } from 'react';
import { useCart } from '../hooks/useCart';
import { Cart } from '../types';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<Cart>;
  updateCartItem: (productId: number, quantity: number) => Promise<Cart>;
  removeFromCart: (productId: number) => Promise<Cart>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartHook = useCart();

  return (
    <CartContext.Provider value={cartHook}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
}