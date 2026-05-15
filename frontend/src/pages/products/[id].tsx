import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NavegacionPrincipal } from '../../components/ui/NavegacionPrincipal';
import { Badge } from '../../components/ui/Badge';
import { SelectorDeCantidad } from '../../components/ui/SelectorDeCantidad';
import { BotonCTAPrimario } from '../../components/ui/BotonCTAPrimario';
import { Modal } from '../../components/ui/Modal';
import { useProduct } from '../../hooks/useProduct';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { tokens } from '../../styles/tokens';

export default function DetalleDeProducto() {
  const router = useRouter();
  const { id } = router.query;
  const { product, fetchProduct, loading, error } = useProduct();
  const { products, fetchProducts } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    }
  }, [id, fetchProduct]);

  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart(product.id, quantity);
      setShowModal(true);
    } catch {
      alert('Error al añadir al carrito');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: tokens.colors.error }}>{error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  const stockBadgeVariant = product.stock > 0 ? 'success' : 'error';

  return (
    <div>
      <NavegacionPrincipal />

      <div style={{ padding: tokens.spacing[6], maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: tokens.spacing[8], flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 400px' }}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: tokens.borderRadius.lg,
              }}
            />
          </div>

          <div style={{ flex: '1 1 400px' }}>
            <div style={{ display: 'flex', gap: tokens.spacing[2], marginBottom: tokens.spacing[4] }}>
              <Badge variant="primary">{product.category}</Badge>
              <Badge variant={stockBadgeVariant}>
                {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
              </Badge>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: tokens.typography.fontWeightBold, marginBottom: tokens.spacing[4] }}>
              {product.name}
            </h1>

            <p style={{ fontSize: '2rem', fontWeight: tokens.typography.fontWeightBold, color: tokens.colors.primary, marginBottom: tokens.spacing[4] }}>
              ${product.price.toFixed(2)}
            </p>

            <p style={{ color: tokens.colors.muted, lineHeight: tokens.typography.lineHeight, marginBottom: tokens.spacing[6] }}>
              {product.description}
            </p>

            <div style={{ marginBottom: tokens.spacing[6] }}>
              <label style={{ display: 'block', marginBottom: tokens.spacing[2], fontWeight: tokens.typography.fontWeightBold }}>
                Cantidad:
              </label>
              <SelectorDeCantidad
                value={quantity}
                onChange={setQuantity}
                max={product.stock}
                disabled={product.stock === 0}
              />
            </div>

            <BotonCTAPrimario onClick={handleAddToCart} disabled={product.stock === 0}>
              Añadir al carrito
            </BotonCTAPrimario>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div style={{ marginTop: tokens.spacing[8] }}>
            <h2 style={{ marginBottom: tokens.spacing[4] }}>Productos Relacionados</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: tokens.spacing[4] }}>
              {relatedProducts.map(p => (
                <div
                  key={p.id}
                  style={{
                    border: `1px solid ${tokens.colors.border}`,
                    borderRadius: tokens.borderRadius.md,
                    padding: tokens.spacing[3],
                    cursor: 'pointer',
                  }}
                  onClick={() => router.push(`/products/${p.id}`)}
                >
                  <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                  <h4>{p.name}</h4>
                  <p style={{ color: tokens.colors.primary, fontWeight: tokens.typography.fontWeightBold }}>
                    ${p.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Producto añadido">
        <p>El producto ha sido añadido a tu carrito.</p>
        <div style={{ display: 'flex', gap: tokens.spacing[4], marginTop: tokens.spacing[4] }}>
          <BotonCTAPrimario onClick={() => router.push('/cart')}>
            Ver carrito
          </BotonCTAPrimario>
          <BotonCTAPrimario onClick={() => setShowModal(false)}>
            Continuar comprando
          </BotonCTAPrimario>
        </div>
      </Modal>
    </div>
  );
}