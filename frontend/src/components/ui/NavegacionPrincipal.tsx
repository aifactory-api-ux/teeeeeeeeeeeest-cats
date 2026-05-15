import { tokens } from '../../styles/tokens';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function NavegacionPrincipal() {
  const router = useRouter();

  const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
    backgroundColor: tokens.colors.surface,
    boxShadow: tokens.shadows.sm,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const logoStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSizeLg,
    fontWeight: tokens.typography.fontWeightBold,
    color: tokens.colors.primary,
    textDecoration: 'none',
  };

  const linkStyle = (isActive: boolean): React.CSSProperties => ({
    marginLeft: tokens.spacing[4],
    textDecoration: 'none',
    color: isActive ? tokens.colors.primary : tokens.colors.secondary,
    fontWeight: isActive ? tokens.typography.fontWeightBold : tokens.typography.fontWeightRegular,
  });

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/products', label: 'Productos' },
    { href: '/cart', label: 'Carrito' },
    { href: '/orders', label: 'Pedidos' },
    { href: '/login', label: 'Iniciar Sesión' },
  ];

  return (
    <nav style={navStyle}>
      <Link href="/" style={logoStyle}>
        Mi Tienda
      </Link>
      <div>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            style={linkStyle(router.pathname === link.href)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}