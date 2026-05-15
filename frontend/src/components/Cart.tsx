import { Cart as CartType } from '../types';
import { CartItem } from './CartItem';
import { BotonCTAPrimario } from './ui/BotonCTAPrimario';

interface CartProps {
  cart: CartType;
  onCheckout: () => void;
  getProduct: (productId: number) => any;
}

export function Cart({ cart, onCheckout, getProduct }: CartProps) {
  const total = cart.items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              product={getProduct(item.productId)}
            />
          ))}
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <BotonCTAPrimario onClick={onCheckout}>
              Proceder al pago
            </BotonCTAPrimario>
          </div>
        </>
      )}
    </div>
  );
}