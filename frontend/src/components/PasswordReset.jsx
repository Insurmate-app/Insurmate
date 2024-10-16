import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useSpinner from "../hooks/useSpinner";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import usePasswordReset from "../hooks/passwordReset/usePasswordReset";
import * as Yup from "yup";

const base_url = import.meta.env.VITE_API_BASE_URL;
const password_reset_url = base_url + "/auth/user/reset";

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
    emailL: Yup.string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      ),
    newPassword: Yup.string()
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
    newPassword: newPassword,
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

    try {
      await schema.validate(data);

      activateSpinner();
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-container card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              className="form-control"
              placeholder="user@email.com"
              value={email}
              onChange={handleEmailChange}
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
                className="form-control"
                value={newPassword}
                onChange={handlePasswordChange}
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
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 mb-3"
            disabled={isButtonDisabled}
          >
            {isSpinnerVisible && (
              <span
                className="spinner-border spinner-border-sm text-dark mt-2"
                role="status"
              ></span>
            )}
            Reset Password
          </button>
        </form>
        <div className="mt-3">
          <p className="text-center">
            Return to <Link to="/login">Login</Link>
          </p>
          <p className="text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
    </div>
  );
};

export default PasswordReset;
