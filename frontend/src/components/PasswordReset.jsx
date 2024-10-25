import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useSpinner from "../hooks/useSpinner";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import usePasswordReset from "../hooks/passwordReset/usePasswordReset";
import * as Yup from "yup";

const base_url = import.meta.env.VITE_API_BASE_URL;
const password_reset_url = base_url + "/user/reset-password";

const PasswordReset = () => {
  const {
    email,
    setEmail,
    newPassword,
    setNewPassword,
    showPassword,
    togglePasswordVisibility,
    setIsButtonDisabled,
    isButtonDisabled,
  } = usePasswordReset();

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ),
    password: Yup.string()
      .required("A new password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*,"?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const data = {
    email: email,
    password: newPassword,
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsButtonDisabled(e.target.value === "" || newPassword === "");
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setIsButtonDisabled(email === "" || e.target.value === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();
    setIsButtonDisabled(true);
    try {
      await schema.validate(data);

      activateSpinner();

      console.log(data);
      const res = await axios.put(password_reset_url, data);

      showModal(res.data);
    } catch (err) {
      deactivateSpinner();
      if (err.name === "ValidationError") {
        showModal(err.errors.join("\n"));
      } else if (err.response) {
        showModal(err.response.data.message);
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
              className="form-control"
              id="email"
              placeholder="user@email.com"
              value={email}
              onChange={handleEmailChange}
              style={{ borderRadius: "8px" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div className="input-group">
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                value={newPassword}
                onChange={handlePasswordChange}
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

        <div className="mt-3">
          <p className="text-center">
            Return to{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Modal for any error or success messages */}
        <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
      </div>
    </div>
  );
};

export default PasswordReset;
