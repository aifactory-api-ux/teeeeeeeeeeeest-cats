import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const cardStyle: React.CSSProperties = {
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#FFFFFF',
  };

  return (
    <div style={cardStyle}>
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart?.(product.id)}>Add to cart</button>
    </div>
  );
}