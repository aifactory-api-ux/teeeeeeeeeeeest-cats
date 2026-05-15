import { tokens } from '../../styles/tokens';

interface BotonCTAPrimarioProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export function BotonCTAPrimario({
  children,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}: BotonCTAPrimarioProps) {
  const buttonStyle: React.CSSProperties = {
    padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
    backgroundColor: disabled ? tokens.colors.muted : tokens.colors.primary,
    color: tokens.colors.text,
    border: 'none',
    borderRadius: tokens.borderRadius.md,
    fontSize: tokens.typography.fontSizeBase,
    fontWeight: tokens.typography.fontWeightBold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    width: fullWidth ? '100%' : 'auto',
    transition: 'opacity 0.2s ease',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      onMouseOver={(e) => {
        if (!disabled) e.currentTarget.style.opacity = '0.9';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      {children}
    </button>
  );
}