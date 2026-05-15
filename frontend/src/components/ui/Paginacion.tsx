import { tokens } from '../../styles/tokens';

interface PaginacionProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Paginacion({ currentPage, totalPages, onPageChange }: PaginacionProps) {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacing[2],
    marginTop: tokens.spacing[6],
  };

  const buttonStyle = (isActive: boolean, isDisabled: boolean): React.CSSProperties => ({
    padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
    backgroundColor: isActive ? tokens.colors.primary : tokens.colors.surface,
    color: isActive ? tokens.colors.text : tokens.colors.secondary,
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.borderRadius.md,
    fontSize: tokens.typography.fontSizeSm,
    fontWeight: isActive ? tokens.typography.fontWeightBold : tokens.typography.fontWeightRegular,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
  });

  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle(false, currentPage === 1)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`} style={{ padding: tokens.spacing[2] }}>
            {page}
          </span>
        ) : (
          <button
            key={page}
            style={buttonStyle(page === currentPage, false)}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        style={buttonStyle(false, currentPage === totalPages)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}