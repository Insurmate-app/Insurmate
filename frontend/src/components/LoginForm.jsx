import { useCallback, useEffect, useMemo, useState } from "react";

import * as Yup from "yup";

import { isTokenValid, storeToken } from "../functions/tokenManager";
import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";
import { useApi } from "./useApi";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();
  const api = useApi();

  // Memoized validation schema
  const schema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .required("Email is required")
          .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email address",
          ),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters long")
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter",
          )
          .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character",
          )
          .required("Password is required"),
      }),
    [],
  );

  const handleInputChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));

      if (errors[id]) {
        setErrors((prev) => ({
          ...prev,
          [id]: null,
        }));
      }
    },
    [formData, errors, schema],
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      activateSpinner();

      try {
        await schema.validate(formData, { abortEarly: false });
        setErrors({});

        const response = await api.post(`/user/login`, formData);
        storeToken(response.data.token);
        window.location.href = "/dashboard";
      } catch (err) {
        deactivateSpinner();

        if (err.name === "ValidationError") {
          const validationErrors = err.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {});
          setErrors(validationErrors);
        } else if (err.response) {
          showModal(err.response.data.message || "Login failed.");
        } else {
          showModal("An unexpected error occurred");
        }
      }
    },
    [formData, schema, api, activateSpinner, deactivateSpinner, showModal],
  );

  // if the token is valid, navigate to dashboard
  useEffect(() => {
    if (isTokenValid()) {
      document.startViewTransition(() => {
        window.location.href = "/dashboard";
      });
    }
  }, []);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-white">
      <div
        className="card p-4 shadow rounded w-100"
        style={{
          maxWidth: "400px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
        }}
      >
        {/* Circular Icon */}
        <div className="text-center mb-3">
          <img
            src="/insurmate_logo.png"
            alt="Icon"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>
          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
                required
              />
              <span
                className="input-group-text bg-transparent border-0"
                onClick={togglePasswordVisibility}
                style={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  color: "#333",
                }}
                role="button"
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </span>
            </div>
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{
              backgroundColor: isSpinnerVisible ? "#ccc" : "#333",
              color: "#fff",
              borderRadius: "8px",
              cursor: isSpinnerVisible ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
            disabled={isSpinnerVisible}
          >
            {isSpinnerVisible && (
              <span
                className="spinner-border spinner-border-sm text-light me-2"
                role="status"
              ></span>
            )}
            Login
          </button>
        </form>

        {/* Forgot Password & Sign-Up Links */}
        <div className="mt-4 text-center">
          <p>
            Don’t have an account?{" "}
            <a
              href="/signup"
              style={{
                color: "#333",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign Up
            </a>
          </p>
          <p>
            <a
              href="/password-reset"
              style={{
                color: "#333",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>
          </p>
        </div>

        {/* Modal for Errors */}
        <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
      </div>
    </div>
  );
};

export default LoginForm;
