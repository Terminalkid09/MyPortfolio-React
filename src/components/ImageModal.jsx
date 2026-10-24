import { useEffect, useRef } from "react";
import "./ImageModal.css";

/**
 * The enlarged screenshot.
 *
 * It was a div with an onClick and nothing else: no dialog role, no Escape, no
 * way for a keyboard to close it, and the whole viewport was a close button,
 * including the image itself. Now it is a real dialog (role + aria-modal), the
 * click only closes from the overlay, Escape works, focus starts on the close
 * button and the page behind it stops scrolling.
 */
export default function ImageModal({ src, alt, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="modal-close"
        onClick={onClose}
        aria-label="Close image"
      >
        ✕
      </button>

      <img
        className="modal-image"
        src={src}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}
