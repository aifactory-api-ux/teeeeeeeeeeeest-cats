import { useEffect, useState } from 'react';
import { NavegacionPrincipal } from '../components/ui/NavegacionPrincipal';
import { TarjetaDeProducto } from '../components/ui/TarjetaDeProducto';
import { BarraDeBusqueda } from '../components/ui/BarraDeBusqueda';
import { Paginacion } from '../components/ui/Paginacion';
import { BotonCTAPrimario } from '../components/ui/BotonCTAPrimario';
import { useProducts } from '../hooks/useProducts';
import { tokens } from '../styles/tokens';
import { useRouter } from 'next/router';
import { useCart } from '../hooks/useCart';

export default function Inicio() {
  const { products, fetchProducts, loading, error } = useProducts();
  const { addToCart, fetchCart } = useCart();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, [fetchProducts, fetchCart]);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredProducts = filteredProducts.slice(0, 6);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      alert('Producto añadido al carrito');
    } catch {
      alert('Error al añadir al carrito');
    }
  };

  const heroStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.primary,
    padding: `${tokens.spacing[8]} ${tokens.spacing[6]}`,
    textAlign: 'center',
    color: tokens.colors.text,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: tokens.typography.fontWeightBold,
    marginBottom: tokens.spacing[4],
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSizeLg,
    marginBottom: tokens.spacing[6],
  };

  const sectionStyle: React.CSSProperties = {
    padding: `${tokens.spacing[8]} ${tokens.spacing[6]}`,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: tokens.spacing[6],
    marginTop: tokens.spacing[6],
  };

  const categories = ['Electrónica', 'Ropa', 'Hogar', 'Deportes'];

  return (
    <div>
      <NavegacionPrincipal />

      <div style={heroStyle}>
        <h1 style={titleStyle}>Bienvenido a Mi Tienda</h1>
        <p style={subtitleStyle}>Los mejores productos a los mejores precios</p>
        <BarraDeBusqueda
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar productos..."
        />
      </div>

      <div style={sectionStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: tokens.spacing[4] }}>Categorías</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: tokens.spacing[4], flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <BotonCTAPrimario key={cat} onClick={() => router.push(`/products?category=${cat}`)}>
              {cat}
            </BotonCTAPrimario>
          ))}
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: tokens.spacing[4] }}>Productos Populares</h2>
        {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}
        {error && <p style={{ textAlign: 'center', color: tokens.colors.error }}>{error}</p>}
        <div style={gridStyle}>
          {featuredProducts.map(product => (
            <TarjetaDeProducto
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onClick={() => router.push(`/products/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}