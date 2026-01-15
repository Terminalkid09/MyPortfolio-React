import "./ImageModal.css";

export default function ImageModal({ src, alt, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <img className="modal-image" src={src} alt={alt} />
    </div>
  );
}