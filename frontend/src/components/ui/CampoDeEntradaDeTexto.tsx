import { tokens } from '../../styles/tokens';

interface CampoDeEntradaDeTextoProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
}

export function CampoDeEntradaDeTexto({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  name,
}: CampoDeEntradaDeTextoProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing[1],
  };

  const labelStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSizeSm,
    fontWeight: tokens.typography.fontWeightBold,
    color: tokens.colors.text,
  };

  const inputStyle: React.CSSProperties = {
    padding: tokens.spacing[3],
    border: `1px solid ${error ? tokens.colors.error : tokens.colors.border}`,
    borderRadius: tokens.borderRadius.md,
    fontSize: tokens.typography.fontSizeBase,
    color: tokens.colors.text,
    backgroundColor: disabled ? tokens.colors.border : tokens.colors.surface,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSizeSm,
    color: tokens.colors.error,
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = tokens.colors.primary;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? tokens.colors.error : tokens.colors.border;
        }}
      />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}