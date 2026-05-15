import { tokens } from '../../styles/tokens';
import { useState } from 'react';

interface BarraDeBusquedaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
}

export function BarraDeBusqueda({
  value,
  onChange,
  placeholder = 'Buscar...',
  onSearch,
}: BarraDeBusquedaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
    paddingLeft: '44px',
    border: `1px solid ${isFocused ? tokens.colors.primary : tokens.colors.border}`,
    borderRadius: tokens.borderRadius.full,
    fontSize: tokens.typography.fontSizeBase,
    color: tokens.colors.text,
    backgroundColor: tokens.colors.surface,
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: isFocused ? `0 0 0 3px ${tokens.colors.primary}20` : 'none',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    left: tokens.spacing[4],
    top: '50%',
    transform: 'translateY(-50%)',
    color: tokens.colors.muted,
    pointerEvents: 'none',
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div style={containerStyle}>
      <span style={iconStyle}>🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}