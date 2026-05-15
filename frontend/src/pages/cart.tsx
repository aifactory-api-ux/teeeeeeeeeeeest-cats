import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NavegacionPrincipal } from '../components/ui/NavegacionPrincipal';
import { CartItem } from '../components/CartItem';
import { BotonCTAPrimario } from '../components/ui/BotonCTAPrimario';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { useAuthContext } from '../context/AuthContext';
import { tokens } from '../styles/tokens';

export default function CarritoDeCompras() {
  const router = useRouter();
  const { cart, fetchCart, updateCartItem, removeFromCart, loading, error } = useCart();
  const { createOrder } = useOrders();
  const { products, fetchProducts } = useProducts();
  const { user } = useAuthContext();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
    fetchProducts();
  }, [user, fetchCart, fetchProducts]);

  const getProduct = (productId: number) => products.find(p => p.id === productId);

  const total = cart?.items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0) || 0;

  const handleCheckout = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setCheckoutLoading(true);
    try {
      await createOrder();
      alert('¡Pedido realizado con éxito!');
      router.push('/orders');
    } catch {
      alert('Error al procesar el pedido');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!user) {
    return (
      <div>
        <NavegacionPrincipal />
        <div style={{ padding: tokens.spacing[8], textAlign: 'center' }}>
          <h2>Debes iniciar sesión para ver tu carrito</h2>
          <BotonCTAPrimario onClick={() => router.push('/login')}>
            Iniciar Sesión
          </BotonCTAPrimario>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavegacionPrincipal />

      <div style={{ padding: tokens.spacing[6], maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: tokens.spacing[6] }}>Carrito de Compras</h1>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: tokens.colors.error }}>{error}</p>}

        {!cart || cart.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: tokens.spacing[8] }}>
            <p style={{ marginBottom: tokens.spacing[4] }}>Tu carrito está vacío</p>
            <BotonCTAPrimario onClick={() => router.push('/products')}>
              Ver productos
            </BotonCTAPrimario>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: tokens.spacing[6] }}>
              {cart.items.map(item => {
                const product = getProduct(item.productId);
                return (
                  <CartItem
                    key={item.productId}
                    item={item}
                    product={product}
                    onUpdate={(qty) => updateCartItem(item.productId, qty)}
                    onRemove={() => removeFromCart(item.productId)}
                  />
                );
              })}
            </div>

            <div style={{
              borderTop: `2px solid ${tokens.colors.border}`,
              paddingTop: tokens.spacing[6],
              marginTop: tokens.spacing[6],
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: tokens.typography.fontSizeLg }}>
                  Total: ${total.toFixed(2)}
                </h2>
                <BotonCTAPrimario onClick={handleCheckout} disabled={checkoutLoading}>
                  {checkoutLoading ? 'Procesando...' : 'Proceder al pago'}
                </BotonCTAPrimario>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}