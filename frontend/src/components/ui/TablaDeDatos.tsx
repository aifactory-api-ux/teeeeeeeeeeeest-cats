import { tokens } from '../../styles/tokens';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface TablaDeDatosProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function TablaDeDatos<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
}: TablaDeDatosProps<T>) {
  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borderRadius.md,
    overflow: 'hidden',
    boxShadow: tokens.shadows.md,
  };

  const thStyle: React.CSSProperties = {
    padding: tokens.spacing[3],
    textAlign: 'left',
    backgroundColor: tokens.colors.primary,
    color: tokens.colors.text,
    fontWeight: tokens.typography.fontWeightBold,
    fontSize: tokens.typography.fontSizeSm,
  };

  const tdStyle: React.CSSProperties = {
    padding: tokens.spacing[3],
    borderBottom: `1px solid ${tokens.colors.border}`,
    color: tokens.colors.text,
    fontSize: tokens.typography.fontSizeBase,
  };

  const trStyle = (index: number): React.CSSProperties => ({
    backgroundColor: index % 2 === 0 ? tokens.colors.surface : tokens.colors.background,
    cursor: onRowClick ? 'pointer' : 'default',
  });

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} style={thStyle}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            style={trStyle(index)}
            onClick={() => onRowClick?.(item)}
          >
            {columns.map((col) => (
              <td key={String(col.key)} style={tdStyle}>
                {col.render
                  ? col.render(item)
                  : String(item[col.key as keyof T] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}