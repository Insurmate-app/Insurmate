import { useCallback, useMemo, useState } from "react";

import * as Yup from "yup";

import { encodeBase64 } from "../functions/base64";
import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";
import { useApi } from "./useApi";

const SignUpForm = () => {
  const api = useApi();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    isTermsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  // Memoized validation schema
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email("Enter a valid email")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "At least 8 characters")
          .matches(/[A-Z]/, "Must contain an uppercase letter")
          .matches(/[!@#$%^&*]/, "Must contain a special character")
          .required("Password is required"),
        companyName: Yup.string()
          .min(8, "At least 8 characters")
          .max(28, "No more than 28 characters")
          .required("Company name is required"),
        addressLine1: Yup.string().required("Address line 1 is required"),
        addressLine2: Yup.string(),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zipCode: Yup.string()
          .matches(/^\d{5}$/, "Zip code must be 5 digits")
          .required("Zip code is required"),
        isTermsAccepted: Yup.boolean().oneOf(
          [true],
          "You must accept the terms",
        ),
      }),
    [],
  );
  // Add isFormValid state
  const [isFormValid, setIsFormValid] = useState(false);
  // Update handleInputChange to handle checkbox correctly and validate form
  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setFormValues((prevValues) => {
        const updatedValues = {
          ...prevValues,
          [name]: newValue,
        };

        // Validate form after update
        validationSchema
          .isValid(updatedValues)
          .then((valid) => setIsFormValid(valid));

        return updatedValues;
      });

      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }
    },
    [errors, validationSchema],
  );
  // Optimized submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      activateSpinner();

      try {
        await validationSchema.validate(formValues, { abortEarly: false });
        setErrors({});

        const payload = {
          email: formValues.email,
          password: formValues.password,
          companyName: formValues.companyName,
          address: {
            addressLine1: formValues.addressLine1,
            addressLine2: formValues.addressLine2,
            city: formValues.city,
            state: formValues.state,
            zipCode: formValues.zipCode,
          },
        };

        await api.post(`/user/create`, payload);
        window.location.href = `/activate?email=${encodeURIComponent(
          encodeBase64(formValues.email),
        )}`;
      } catch (err) {
        deactivateSpinner();

        if (err.name === "ValidationError") {
          const validateFormData = {};
          err.inner.forEach((er) => {
            validateFormData[er.path] = er.message;
          });
          setErrors(validateFormData);
        } else if (err.response) {
          showModal(err.response.data.message || "Error from server");
        } else {
          showModal("An unexpected error occurred");
        }
      }
    },
    [
      formValues,
      validationSchema,
      api,
      activateSpinner,
      deactivateSpinner,
      showModal,
    ],
  );

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card p-4 shadow rounded w-100"
        style={{
          maxWidth: "450px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#333" }}>
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">
              Email <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="email"
              name="email"
              className={`form-control border-0 border-bottom rounded-0 ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="user@example.com"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Password <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control border-0 border-bottom rounded-0 ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                value={formValues.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="input-group-text bg-transparent border-0"
                onClick={() => setShowPassword((prev) => !prev)}
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

          <div className="mb-3">
            <label className="form-label fw-bold">
              Company Name <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              name="companyName"
              className={`form-control border-0 border-bottom rounded-0 ${
                errors.companyName ? "is-invalid" : ""
              }`}
              placeholder="ABC Corporation"
              value={formValues.companyName}
              onChange={handleInputChange}
              required
            />
            {errors.companyName && (
              <small className="text-danger">{errors.companyName}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Address Line 1 <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              name="addressLine1"
              className={`form-control border-0 border-bottom rounded-0 ${
                errors.addressLine1 ? "is-invalid" : ""
              }`}
              placeholder="123 Main St"
              value={formValues.addressLine1}
              onChange={handleInputChange}
              required
            />
            {errors.addressLine1 && (
              <small className="text-danger">{errors.addressLine1}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              className={`form-control border-0 border-bottom rounded-0 ${
                errors.addressLine2 ? "is-invalid" : ""
              }`}
              placeholder="Apt 1"
              value={formValues.addressLine2}
              onChange={handleInputChange}
            />
            {errors.addressLine2 && (
              <small className="text-danger">{errors.addressLine2}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              City <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="city"
              className={`form-control border-0 border-bottom rounded-0 ${
                errors.city ? "is-invalid" : ""
              }`}
              placeholder="City"
              value={formValues.city}
              onChange={handleInputChange}
              required
            />
            {errors.city && (
              <small className="text-danger">{errors.city}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              State <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="state"
              className={`form-control border-0 border-bottom rounded-0 ${
                errors.state ? "is-invalid" : ""
              }`}
              placeholder="State"
              value={formValues.state}
              onChange={handleInputChange}
              required
            />
            {errors.state && (
              <small className="text-danger">{errors.state}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Zip Code <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              className={`form-control border-0 border-bottom rounded-0 ${
                errors.zipCode ? "is-invalid" : ""
              }`}
              placeholder="12345"
              value={formValues.zipCode}
              onChange={handleInputChange}
              required
            />
            {errors.zipCode && (
              <small className="text-danger">{errors.zipCode}</small>
            )}
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="isTermsAccepted"
              className="form-check-input"
              checked={formValues.isTermsAccepted}
              onChange={handleInputChange}
            />
            <label className="form-check-label">
              I agree to the{" "}
              <a
                href="/tos"
                target="_blank"
                style={{
                  color: "#333",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Terms of Service
              </a>
            </label>
          </div>

          {/* Update the submit button */}
          <button
            type="submit"
            className="btn w-100"
            disabled={!isFormValid || isSpinnerVisible}
            style={{
              backgroundColor:
                !isFormValid || isSpinnerVisible ? "#ccc" : "#333",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor:
                !isFormValid || isSpinnerVisible ? "not-allowed" : "pointer",
            }}
          >
            {isSpinnerVisible && (
              <span
                className="spinner-border spinner-border-sm text-light me-2"
                role="status"
              ></span>
            )}
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#333",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login
          </a>
        </p>
      </div>
      <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
    </div>
  );
};

export default SignUpForm;
