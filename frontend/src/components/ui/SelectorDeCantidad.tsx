import { tokens } from '../../styles/tokens';
import { BotonCTAPrimario } from './BotonCTAPrimario';

interface SelectorDeCantidadProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function SelectorDeCantidad({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: SelectorDeCantidadProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing[2],
  };

  const buttonStyle: React.CSSProperties = {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.primary,
    color: tokens.colors.text,
    border: 'none',
    borderRadius: tokens.borderRadius.md,
    fontSize: tokens.typography.fontSizeLg,
    fontWeight: tokens.typography.fontWeightBold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const valueStyle: React.CSSProperties = {
    minWidth: '40px',
    textAlign: 'center',
    fontSize: tokens.typography.fontSizeBase,
    fontWeight: tokens.typography.fontWeightBold,
    color: tokens.colors.text,
  };

  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  return (
    <div style={containerStyle}>
      <button
        type="button"
        style={buttonStyle}
        onClick={handleDecrement}
        disabled={disabled || value <= min}
      >
        -
      </button>
      <span style={valueStyle}>{value}</span>
      <button
        type="button"
        style={buttonStyle}
        onClick={handleIncrement}
        disabled={disabled || value >= max}
      >
        +
      </button>
    </div>
  );
}