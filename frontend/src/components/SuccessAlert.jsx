import PropTypes from "prop-types";

const SuccessAlert = ({ message, onClose }) => {
  return (
    <div
      className="alert alert-success alert-dismissible fade show mb-4"
      role="alert"
      style={{
        backgroundColor: "#d4edda",
        border: "1px solid #c3e6cb",
        borderRadius: "8px",
        padding: "16px 24px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        animation: "slideDown 0.3s ease-out",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <i
          className="bi bi-check-circle-fill"
          style={{ fontSize: "24px", color: "#28a745" }}
        ></i>
        <span style={{ color: "#155724", fontSize: "16px" }}>{message}</span>
      </div>
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
        style={{ opacity: "0.7" }}
      ></button>
    </div>
  );
};

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessAlert;
