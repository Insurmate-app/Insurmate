import React, { useState } from "react";

import * as Yup from "yup";

import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";
import api from "./api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [errors, setErrors] = useState({});

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*,"?":{}|<>]/,
        "Password must contain at least one special character",
      ),
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);

    //setIsButtonDisabled(email.trim() === "" || password.trim() === "");
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();
    setIsButtonDisabled(true);

    const data = { email, password };

    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});

      const response = await api.post(`/user/login`, data);

      const token = response.data.token;
      localStorage.setItem("token", token);

      window.location.href = "/dashboard";
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
        showModal(err.response.data.message || "Login failed.");
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
                value={password}
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
