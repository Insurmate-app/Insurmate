import { useState } from "react";

const useConfirmDialog = () => {
  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    resolve: null,
  });

  const confirm = (message) =>
    new Promise((resolve) => {
      setDialog({ open: true, message, resolve });
    });

  const handleConfirm = (result) => {
    if (dialog.resolve) dialog.resolve(result);
    setDialog({ open: false, message: "", resolve: null });
  };

  const ConfirmDialog = dialog.open && (
    <div style={backdropStyle}>
      <div style={modalStyle} className="confirm-modal">
        <div style={iconContainerStyle}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#e3e7fd" />
            <path
              d="M12 8v4"
              stroke="#3f51b5"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="#3f51b5" />
          </svg>
        </div>
        <p style={messageStyle}>{dialog.message}</p>
        <div style={buttonContainerStyle}>
          <button
            style={cancelButtonStyle}
            onClick={() => handleConfirm(false)}
          >
            Cancel
          </button>
          <button style={okButtonStyle} onClick={() => handleConfirm(true)}>
            OK
          </button>
        </div>
      </div>
      <style>
        {`
          .confirm-modal {
            animation: popIn 0.22s cubic-bezier(.4,2,.6,1) both;
          }
          @keyframes popIn {
            0% { transform: scale(0.85); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );

  return [confirm, ConfirmDialog];
};

export default useConfirmDialog;

// Styling objects
const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(40, 48, 72, 0.32)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "32px 28px 24px 28px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(40,48,72,0.18)",
  minWidth: "340px",
  maxWidth: "90vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const iconContainerStyle = {
  marginBottom: "12px",
};

const messageStyle = {
  marginBottom: "28px",
  fontSize: "17px",
  color: "#2d3559",
  textAlign: "center",
  fontWeight: 500,
  letterSpacing: "0.01em",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "18px",
  width: "100%",
};

const cancelButtonStyle = {
  padding: "10px 24px",
  backgroundColor: "#f5f6fa",
  color: "#3f51b5",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: "15px",
  transition: "background 0.15s",
};

const okButtonStyle = {
  padding: "10px 24px",
  backgroundColor: "#3f51b5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 500,
  fontSize: "15px",
  boxShadow: "0 2px 8px rgba(63,81,181,0.08)",
  transition: "background 0.15s",
};
