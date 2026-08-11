import React, { useCallback, useEffect, useRef } from 'react';
import './Modal.scss';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Thin wrapper over the native <dialog> element. Calling showModal() gives us
 * focus trapping, Esc-to-close, an inert background and ::backdrop for free,
 * so there is no key handling or focus bookkeeping to maintain here.
 */
function Modal({ open, title, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      // showModal() puts focus on the first focusable descendant, which is the
      // close button. React's autoFocus can't override that — it fires during
      // commit, while the dialog is still closed, so the focus doesn't stick.
      dialog.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Esc closes the dialog natively, so state has to follow the element rather
  // than the other way round — otherwise `open` would desync after Esc.
  const handleClose = useCallback(() => onClose(), [onClose]);

  // A click that lands on the dialog element itself (not its content) is a
  // click on the backdrop.
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className='modal'
      aria-labelledby='modal-title'
      onClose={handleClose}
      onClick={handleClick}
    >
      <div className='modal-panel'>
        <div className='modal-head'>
          <h2 id='modal-title' className='modal-title'>{title}</h2>
          <button
            type='button'
            className='modal-close'
            onClick={onClose}
          >
            <span aria-hidden='true'>&times;</span>
            <span className='visually-hidden'>Close</span>
          </button>
        </div>
        {/*
          Children are mounted only while open, so the contents start fresh on
          every open rather than retaining whatever was left behind last time.
        */}
        {open && children}
      </div>
    </dialog>
  );
}

export default Modal;
