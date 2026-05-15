import { Cart, CartItem } from '../shared/types';
import { getRedisClient } from '../utils/redis';

export async function getCartByUserId(userId: number): Promise<Cart> {
  const client = await getRedisClient();
  const cartKey = `cart:${userId}`;
  const cartData = await client.get(cartKey);

  if (cartData) {
    return JSON.parse(cartData);
  }

  return {
    id: 0,
    userId,
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function addCartItem(userId: number, productId: number, quantity: number): Promise<Cart> {
  const cart = await getCartByUserId(userId);
  const existingItem = cart.items.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  cart.updatedAt = new Date().toISOString();

  const client = await getRedisClient();
  await client.set(`cart:${userId}`, JSON.stringify(cart));

  return cart;
}

export async function updateCartItemQuantity(userId: number, productId: number, quantity: number): Promise<Cart> {
  const cart = await getCartByUserId(userId);
  const itemIndex = cart.items.findIndex(item => item.productId === productId);

  if (itemIndex === -1) {
    throw new Error('Item not found');
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  cart.updatedAt = new Date().toISOString();

  const client = await getRedisClient();
  await client.set(`cart:${userId}`, JSON.stringify(cart));

  return cart;
}

export async function removeCartItem(userId: number, productId: number): Promise<Cart> {
  const cart = await getCartByUserId(userId);
  const itemIndex = cart.items.findIndex(item => item.productId === productId);

  if (itemIndex === -1) {
    throw new Error('Item not found');
  }

  cart.items.splice(itemIndex, 1);
  cart.updatedAt = new Date().toISOString();

  const client = await getRedisClient();
  await client.set(`cart:${userId}`, JSON.stringify(cart));

  return cart;
}

export async function clearCart(userId: number): Promise<void> {
  const client = await getRedisClient();
  await client.del(`cart:${userId}`);
}