import "./imagemodal.css";

const ImageModal = ({ show, onClose, imageUrl }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="image-modal-close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="Avatar" className="image-modal-img" />
      </div>
    </div>
  );
};

export default ImageModal;
