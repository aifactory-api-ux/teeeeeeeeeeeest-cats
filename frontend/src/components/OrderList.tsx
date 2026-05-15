import { Order } from '../types';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  orders: Order[];
  onSelect: (id: number) => void;
}

export function OrderList({ orders, onSelect }: OrderListProps) {
  return (
    <div>
      <h2>Mis Pedidos</h2>
      {orders.length === 0 ? (
        <p>No tienes pedidos aún</p>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id} order={order} onClick={() => onSelect(order.id)} />
        ))
      )}
    </div>
  );
}