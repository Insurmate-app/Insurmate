import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import * as Yup from "yup";

import { encodeBase64 } from "../functions/base64";
import { obfuscate } from "../functions/obfs";
import useSpinner from "../hooks/useSpinner";
import ToastComponent from "./ToastComponent";
import { useApi } from "./useApi";

const PasswordResetForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();

  const [errors, setErrors] = useState({});

  const api = useApi();

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
          .required("A new password is required")
          .min(8, "Password must be at least 8 characters long")
          .matches(
            /[A-Z]/,
            "Password must contain at least one uppercase letter",
          )
          .matches(
            /[!@#$%^&*,"?":{}|<>]/,
            "Password must contain at least one special character",
          ),
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

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});

      const email = formData.email;

      const data = {
        email: email,
        password: formData.password,
      };

      await api.put(`/user/reset-password`, data);

      const obfuscated_email = encodeBase64(obfuscate(email));

      window.location.href = `/activate?ep=${encodeURIComponent(obfuscated_email)}`;
    } catch (err) {
      console.log(err);
      deactivateSpinner();

      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else if (err.response) {
        toast.error(err.response.data.message || "Reset password failed.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      {" "}
      <ToastComponent />
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
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
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
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordResetForm;
