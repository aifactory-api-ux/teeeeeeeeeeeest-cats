import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NavegacionPrincipal } from '../../components/ui/NavegacionPrincipal';
import { ProductList } from '../../components/ProductList';
import { BarraDeBusqueda } from '../../components/ui/BarraDeBusqueda';
import { Paginacion } from '../../components/ui/Paginacion';
import { Badge } from '../../components/ui/Badge';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../hooks/useCart';
import { tokens } from '../../styles/tokens';

const PRODUCTS_PER_PAGE = 12;

export default function CatalogoDeProductos() {
  const router = useRouter();
  const { products, fetchProducts, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (router.query.category) {
      setSelectedCategory(router.query.category as string);
    }
  }, [router.query.category]);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      alert('Producto añadido al carrito');
    } catch {
      alert('Error al añadir al carrito');
    }
  };

  const sidebarStyle: React.CSSProperties = {
    width: '250px',
    padding: tokens.spacing[4],
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borderRadius.md,
    boxShadow: tokens.shadows.sm,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    padding: tokens.spacing[4],
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing[6],
    padding: tokens.spacing[6],
  };

  return (
    <div>
      <NavegacionPrincipal />

      <div style={containerStyle}>
        <div style={sidebarStyle}>
          <h3 style={{ marginBottom: tokens.spacing[4] }}>Categorías</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing[2] }}>
            <Badge
              variant={!selectedCategory ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(null)}
              style={{ cursor: 'pointer' }}
            >
              Todas
            </Badge>
            {categories.map(cat => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? 'primary' : 'secondary'}
                onClick={() => setSelectedCategory(cat)}
                style={{ cursor: 'pointer' }}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div style={mainStyle}>
          <div style={{ marginBottom: tokens.spacing[6] }}>
            <BarraDeBusqueda
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar productos..."
            />
          </div>

          {loading && <p>Cargando productos...</p>}
          {error && <p style={{ color: tokens.colors.error }}>{error}</p>}

          <ProductList
            products={paginatedProducts}
            onSelect={(id) => router.push(`/products/${id}`)}
            onAddToCart={handleAddToCart}
          />

          {totalPages > 1 && (
            <Paginacion
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}