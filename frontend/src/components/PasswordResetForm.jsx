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

    // Dynamically enable/disable the button
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

      // If Yup validation fails
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
      // If axios request fails
      else if (err.response) {
        showModal(err.response.data.message); // Show server error
      } else {
        showModal("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="signup-container card shadow p-4 rounded"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="user@email.com"
              value={email}
              onChange={handleInputChange}
              style={{ borderRadius: "8px" }}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div className="input-group">
              <input
                required
                type={showPassword ? "text" : "password"}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                id="password"
                value={newPassword}
                onChange={handleInputChange}
                style={{ borderRadius: "8px" }}
              />
              <span
                className="input-group-text toggle-password"
                role="button"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", borderRadius: "8px" }}
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </span>
            </div>
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isButtonDisabled}
            style={{
              backgroundColor: isButtonDisabled ? "#ccc" : "#6c63ff",
              borderRadius: "8px",
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
            }}
          >
            {isSpinnerVisible && (
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></span>
            )}
            Reset Password
          </button>
        </form>
        {/* Modal for any error or success messages */}
        <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
      </div>
    </div>
  );
};

export default PasswordResetForm;
