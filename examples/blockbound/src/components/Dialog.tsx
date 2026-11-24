import { useEffect, useRef, type ReactNode } from 'react';
import { CloseIcon } from './Icons';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

export function Dialog({ open, onClose, labelledBy, className = '', children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog__panel">
        <button className="icon-button dialog__close" type="button" onClick={onClose} aria-label="Close dialog">
          <CloseIcon />
        </button>
        {children}
      </div>
    </dialog>
  );
}
