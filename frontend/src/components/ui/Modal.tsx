import { tokens } from '../../styles/tokens';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.borderRadius.lg,
    boxShadow: tokens.shadows.lg,
    minWidth: '400px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: tokens.spacing[4],
    borderBottom: `1px solid ${tokens.colors.border}`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: tokens.typography.fontSizeLg,
    fontWeight: tokens.typography.fontWeightBold,
    color: tokens.colors.text,
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    fontSize: tokens.typography.fontSizeLg,
    cursor: 'pointer',
    color: tokens.colors.muted,
    padding: tokens.spacing[1],
  };

  const contentStyle: React.CSSProperties = {
    padding: tokens.spacing[4],
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        {title && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button style={closeButtonStyle} onClick={onClose}>
              ×
            </button>
          </div>
        )}
        <div style={contentStyle}>{children}</div>
      </div>
    </div>
  );
}