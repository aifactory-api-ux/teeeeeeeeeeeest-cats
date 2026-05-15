import { Product } from '../types';
import { TarjetaDeProducto } from './ui/TarjetaDeProducto';

interface ProductListProps {
  products: Product[];
  onSelect: (id: number) => void;
  onAddToCart?: (productId: number) => void;
}

export function ProductList({ products, onSelect, onAddToCart }: ProductListProps) {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
    padding: '1rem 0',
  };

  return (
    <div style={gridStyle}>
      {products.map((product) => (
        <TarjetaDeProducto
          key={product.id}
          product={product}
          onClick={onSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}