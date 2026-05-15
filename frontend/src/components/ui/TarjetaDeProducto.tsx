import { tokens } from '../../styles/tokens';
import { Product } from '../../types';
import { Badge } from './Badge';
import { BotonCTAPrimario } from './BotonCTAPrimario';

interface TarjetaDeProductoProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
  onClick?: (productId: number) => void;
}

export function TarjetaDeProducto({ product, onAddToCart, onClick }: TarjetaDeProductoProps) {
  const cardStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borderRadius.lg,
    boxShadow: tokens.shadows.md,
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 0.2s ease',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    backgroundColor: tokens.colors.border,
  };

  const contentStyle: React.CSSProperties = {
    padding: tokens.spacing[4],
  };

  const nameStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSizeLg,
    fontWeight: tokens.typography.fontWeightBold,
    color: tokens.colors.text,
    marginBottom: tokens.spacing[2],
  };

  const priceStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSizeLg,
    fontWeight: tokens.typography.fontWeightBold,
    color: tokens.colors.primary,
  };

  const stockBadgeVariant = product.stock > 0 ? 'success' : 'error';

  return (
    <div
      style={cardStyle}
      onClick={() => onClick?.(product.id)}
      onMouseOver={(e) => {
        if (onClick) e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <img src={product.imageUrl} alt={product.name} style={imageStyle} />
      <div style={contentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 style={nameStyle}>{product.name}</h3>
          <Badge variant={stockBadgeVariant}>
            {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
          </Badge>
        </div>
        <p style={{ color: tokens.colors.muted, marginBottom: tokens.spacing[3] }}>
          {product.description.substring(0, 80)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={priceStyle}>${product.price.toFixed(2)}</span>
          {onAddToCart && product.stock > 0 && (
            <BotonCTAPrimario onClick={() => onAddToCart(product.id)}>
              Añadir al carrito
            </BotonCTAPrimario>
          )}
        </div>
      </div>
    </div>
  );
}