import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NavegacionPrincipal } from '../components/ui/NavegacionPrincipal';
import { OrderList } from '../components/OrderList';
import { BotonCTAPrimario } from '../components/ui/BotonCTAPrimario';
import { useOrders } from '../hooks/useOrders';
import { useAuthContext } from '../context/AuthContext';
import { tokens } from '../styles/tokens';

export default function Pedidos() {
  const router = useRouter();
  const { orders, fetchOrders, loading, error } = useOrders();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  if (!user) {
    return (
      <div>
        <NavegacionPrincipal />
        <div style={{ padding: tokens.spacing[8], textAlign: 'center' }}>
          <h2>Debes iniciar sesión para ver tus pedidos</h2>
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
        <h1 style={{ marginBottom: tokens.spacing[6] }}>Mis Pedidos</h1>

        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: tokens.colors.error }}>{error}</p>}

        <OrderList orders={orders} onSelect={(id) => router.push(`/orders/${id}`)} />
      </div>
    </div>
  );
}