import "./confirmationmodal.css";

const ConfirmationModal = ({ show, onConfirm, onCancel, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={onCancel} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
