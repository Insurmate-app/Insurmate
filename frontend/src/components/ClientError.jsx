import { AlertTriangle } from "lucide-react";
import PropTypes from "prop-types";

const ClientError = ({ message }) => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow-lg p-5"
        style={{ maxWidth: "500px" }}
      >
        <div className="text-center">
          <div className="mb-4">
            <AlertTriangle
              size={64}
              className="text-danger animate__animated animate__pulse animate__infinite"
            />
          </div>
          <h2 className="display-6 fw-bold mb-3 text-dark">
            Your session has timed out
          </h2>
          <p className="text-secondary fs-5">
            {message || "Please login again to continue."}
          </p>
          <button
            className="btn btn-danger mt-4 mb-3 px-4 py-2"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Try Again
          </button>
          <div>
            <a href="/login" className="text-decoration-none text-secondary">
              <i className="bi bi-arrow-left me-1"></i>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ClientError.propTypes = {
  message: PropTypes.string,
};

export default ClientError;
