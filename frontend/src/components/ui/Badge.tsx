import { tokens } from '../../styles/tokens';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: tokens.colors.primary, text: tokens.colors.text },
  secondary: { bg: tokens.colors.secondary, text: tokens.colors.surface },
  success: { bg: tokens.colors.success, text: tokens.colors.surface },
  error: { bg: tokens.colors.error, text: tokens.colors.surface },
  warning: { bg: tokens.colors.accent, text: tokens.colors.surface },
};

export function Badge({ children, variant = 'primary' }: BadgeProps) {
  const colors = variantColors[variant];

  const style: React.CSSProperties = {
    display: 'inline-block',
    padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
    backgroundColor: colors.bg,
    color: colors.text,
    fontSize: tokens.typography.fontSizeSm,
    fontWeight: tokens.typography.fontWeightBold,
    borderRadius: tokens.borderRadius.full,
  };

  return <span style={style}>{children}</span>;
}