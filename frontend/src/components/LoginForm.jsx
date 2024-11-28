import React, { useState } from "react";

import axios from "axios";
import * as Yup from "yup";

import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      )
      .required("Password is required"),
  });

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);

    // Dynamically validate and enable/disable button
    setIsButtonDisabled(email.trim() === "" || password.trim() === "");
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();
    setIsButtonDisabled(true);

    const data = { email, password };

    try {
      // Validate the data using Yup
      await schema.validate(data, { abortEarly: false });

      // Make the Axios post request
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        data,
      );

      // Get the token from the response and store it in localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Redirect to dashboard
      window.location.href = "/dashboard";
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
        className="login-container card shadow p-4 rounded"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form id="login-form" noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={handleInputChange}
              style={{ borderRadius: "8px" }}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={handleInputChange}
                style={{ borderRadius: "8px" }}
                required
              />
              <span
                className="input-group-text toggle-password"
                role="button"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </span>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            id="login_button"
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
            Login
          </button>
        </form>
        <div className="mt-3">
          <p className="text-center">
            Don't have an account? <a href="/signup"> Sign Up</a>
          </p>
          <p className="text-center">
            <a href="/password-reset">Reset Password</a>
          </p>
        </div>
      </div>
      <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
    </div>
  );
};

export default LoginForm;
