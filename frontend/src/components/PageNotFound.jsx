import { FileQuestion } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow-lg p-5"
        style={{ maxWidth: "500px" }}
      >
        <div className="text-center">
          <div className="mb-4">
            <FileQuestion
              size={64}
              className="text-danger animate__animated animate__pulse animate__infinite"
            />
          </div>
          <h2 className="display-6 fw-bold mb-3 text-dark">404 - Page Not Found</h2>
          <p className="text-secondary fs-5">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="btn btn-danger mt-4 mb-3 px-4 py-2"
          >
            <i className="bi bi-house-door me-2"></i>
            Back to Home
          </a>
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

export default NotFoundPage;
