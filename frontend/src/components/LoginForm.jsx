import React from "react";
import useLoginForm from "../hooks/login/useLoginForm";
import useSpinner from "../hooks/useSpinner";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const base_url = import.meta.env.VITE_API_BASE_URL;
const login_url = base_url + "/auth/user/login";

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    setIsButtonDisabled,
    isButtonDisabled,
  } = useLoginForm();

  const schema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const data = {
    email: email,
    password: password,
  };

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsButtonDisabled(e.target.value === "" || password === "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsButtonDisabled(email === "" || e.target.value === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();
    setIsButtonDisabled(true);
    try {
      // Validate the data using Yup
      await schema.validate(data, { abortEarly: false });

      // If validation passes, make the axios post request
      activateSpinner(); // Start spinner if necessary
      const res = await axios.post(login_url, data);

      showModal("Loghin Successful");
    } catch (err) {
      deactivateSpinner();
      setIsButtonDisabled(false);

      // If Yup validation fails
      if (err.name === "ValidationError") {
        showModal(err.errors.join("\n")); // Show validation errors
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
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control"
                value={password}
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
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign Up
            </Link>
          </p>
          <p className="text-center">
            <Link to="/reset-password" className="text-primary">
              Reset Password
            </Link>
          </p>
        </div>
        {/* Bootstrap Modal */}
        <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
      </div>
    </div>
  );
};

export default LoginForm;
