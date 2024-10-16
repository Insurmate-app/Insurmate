import React from "react";

const Modal = ({ isVisible, message, hideModal }) => {
  return (
    <div
      className={`modal fade ${isVisible ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Notification</h5>
            <button
              type="button"
              className="btn-close"
              onClick={hideModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={hideModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
