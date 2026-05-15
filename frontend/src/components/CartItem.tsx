import { CartItem as CartItemType, Product } from '../types';
import { SelectorDeCantidad } from './ui/SelectorDeCantidad';

interface CartItemProps {
  item: CartItemType;
  product?: Product;
  onUpdate: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ item, product, onUpdate, onRemove }: CartItemProps) {
  if (!product) return null;

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #E0E0E0' }}>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
      />
      <div style={{ flex: 1 }}>
        <h4>{product.name}</h4>
        <p>${product.price.toFixed(2)}</p>
      </div>
      <SelectorDeCantidad value={item.quantity} onChange={onUpdate} />
      <button onClick={onRemove}>Eliminar</button>
    </div>
  );
}