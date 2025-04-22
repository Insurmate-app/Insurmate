import { FaCheckCircle } from "react-icons/fa";

const LogoutSuccess = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1050,
        backgroundColor: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "#f0f9f0",
          padding: "16px",
          borderRadius: "8px",
          color: "#2e7d32",
        }}
      >
        <FaCheckCircle size={24} />
        <span style={{ fontSize: "16px", fontWeight: "500" }}>
          Successfully logged out
        </span>
      </div>
    </div>
  );
};

export default LogoutSuccess;
