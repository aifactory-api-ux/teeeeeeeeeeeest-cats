import { Order } from '../types';
import { Badge } from './ui/Badge';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const statusVariant = order.status === 'delivered' ? 'success'
    : order.status === 'cancelled' ? 'error'
    : 'warning';

  return (
    <div
      style={{
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Pedido #{order.id}</h4>
        <Badge variant={statusVariant}>{order.status}</Badge>
      </div>
      <p>Fecha: {new Date(order.createdAt).toLocaleDateString()}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <p>Artículos: {order.items.length}</p>
    </div>
  );
}