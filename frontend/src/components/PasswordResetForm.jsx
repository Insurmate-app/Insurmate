import React, { useState } from "react";

import axios from "axios";
import * as Yup from "yup";

import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ),
    password: Yup.string()
      .required("A new password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*,"?":{}|<>]/,
        "Password must contain at least one special character",
      ),
  });

  const data = {
    email: email,
    password: newPassword,
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") setEmail(value);
    if (id === "password") setNewPassword(value);

    setIsButtonDisabled(email.trim() === "" || newPassword.trim() === "");
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();
    setIsButtonDisabled(true);

    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/reset-password`,
        data,
      );

      window.location.href = `/activate?email=${encodeURIComponent(email)}`;
    } catch (err) {
      deactivateSpinner();
      setIsButtonDisabled(false);

      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else if (err.response) {
        showModal(err.response.data.message || "Reset password failed.");
      } else {
        showModal("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-white">
      <div
        className="card p-4 shadow rounded w-100"
        style={{
          maxWidth: "450px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="user@example.com"
              value={email}
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

          {/* New Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              New Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter a new password"
                value={newPassword}
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
                  color: "#333",
                  borderRadius: "8px",
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
              backgroundColor: isButtonDisabled ? "#ccc" : "#333",
              color: "#fff",
              borderRadius: "8px",
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
            disabled={isButtonDisabled}
          >
            {isSpinnerVisible && (
              <span
                className="spinner-border spinner-border-sm text-light me-2"
                role="status"
              ></span>
            )}
            Reset Password
          </button>
        </form>

        {/* Modal for Errors */}
        <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
      </div>
    </div>
  );
};

export default PasswordResetForm;
