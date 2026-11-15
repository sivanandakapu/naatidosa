import { useEffect, useRef } from 'react';
import { ArrowRight, ShoppingBag, X } from 'lucide-react';

const pickupUrl = 'https://order.toasttab.com/online/naati-dosa-delray';

type OrderPopupProps = {
  onClose: () => void;
  onPickup: () => void;
  selectedMenuItem?: string | null;
  show: boolean;
};

export default function OrderPopup({ onClose, selectedMenuItem, show }: OrderPopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (show && dialog && !dialog.open) dialog.showModal();
    if (!show && dialog?.open) dialog.close();
  }, [show]);

  return (
    <dialog
      ref={dialogRef}
      className="ordering-dialog"
      aria-labelledby="ordering-title"
      aria-describedby="ordering-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="ordering-panel">
        <button className="ordering-close" onClick={onClose} type="button" aria-label="Close ordering options">
          <X size={22} aria-hidden="true" />
        </button>
        <div className="ordering-icon"><ShoppingBag size={24} aria-hidden="true" /></div>
        <h2 id="ordering-title">{selectedMenuItem || 'Order Naati Dosa'}</h2>
        <p id="ordering-description">Place your pickup order on Toast and collect it at the truck.</p>
        <a href={pickupUrl} onClick={onClose} className="ordering-pickup">
          Pickup at Truck <ArrowRight size={20} aria-hidden="true" />
        </a>
        <div className="ordering-delivery" aria-label="Delivery options">
          <button type="button" disabled>DoorDash <span>Coming soon</span></button>
          <button type="button" disabled>Uber Eats <span>Coming soon</span></button>
        </div>
      </div>
      <style>{`
        .ordering-dialog {
          width: min(460px, calc(100% - 2rem)); max-height: calc(100% - 2rem);
          margin: auto; padding: 0; overflow: auto; border: 1px solid #e7d8c7;
          border-radius: 24px; background: #fffaf3; color: #3d2b1f;
          box-shadow: 0 24px 80px rgba(32, 18, 8, .32);
        }
        .ordering-dialog::backdrop { background: rgba(34, 21, 13, .68); }
        .ordering-panel { position: relative; padding: clamp(1.25rem, 5vw, 2rem); }
        .ordering-close {
          position: absolute; top: .75rem; right: .75rem; width: 44px; height: 44px;
          display: grid; place-items: center; border: 0; border-radius: 50%;
          background: transparent; color: #6b3a1f; cursor: pointer;
        }
        .ordering-close:hover { background: #f4e6d6; }
        .ordering-icon {
          display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 1rem;
          color: #6b3a1f; background: #f8e7cb; border-radius: 14px;
        }
        .ordering-panel h2 { margin: 0 0 .5rem; color: #6b3a1f; font-size: clamp(1.55rem, 6vw, 2rem); line-height: 1.15; }
        .ordering-panel p { margin: 0 0 1.25rem; line-height: 1.5; }
        .ordering-pickup {
          display: flex; align-items: center; justify-content: space-between; gap: .5rem;
          min-height: 54px; padding: .75rem 1rem; border-radius: 12px;
          background: #6b3a1f; color: white; font-weight: 800; text-decoration: none;
        }
        .ordering-pickup:hover { background: #4c2918; color: white; }
        .ordering-dialog :focus-visible { outline: 3px solid #a25a0b; outline-offset: 3px; }
        .ordering-delivery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .625rem; margin-top: .875rem; }
        .ordering-delivery button {
          display: flex; flex-direction: column; align-items: center; gap: .25rem;
          padding: .625rem .25rem; border: 1px solid #e7d8c7; border-radius: 12px;
          background: #f7efe5; color: #57483c; font: inherit; font-weight: 700; opacity: 1;
        }
        .ordering-delivery span { font-size: .75rem; font-weight: 500; }
      `}</style>
    </dialog>
  );
}
