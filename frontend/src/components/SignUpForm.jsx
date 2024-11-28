import React, { useState } from "react";

import axios from "axios";
import * as Yup from "yup";

import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";

const SignUpForm = () => {
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  // Validation schema
  const validationSchema = Yup.object().shape({
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
    isTermsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: newValue };
      console.log("Updated Form Values:", updatedValues); // Debugging form updates

      // Validate the form
      validationSchema
        .isValid(updatedValues)
        .then((isValid) => setIsButtonDisabled(!isValid))
        .catch((err) => console.log("Validation Error:", err)); // Log validation errors

      return updatedValues;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();

    try {
      console.log("Validating formValues:", formValues); // Debugging validation
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({}); // Clear previous errors

      // Construct API payload
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

      console.log("Payload to send:", payload); // Debugging payload structure

      // Send request to the server
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/create`,
        payload,
      );

      // Redirect after successful submission
      window.location.href = `/activate?email=${encodeURIComponent(
        formValues.email,
      )}`;
    } catch (err) {
      deactivateSpinner();
      console.log("Error during submission:", err); // Debugging submission errors
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else if (err.response) {
        console.log("Server Response Error:", err.response.data); // Debug server response
        showModal(err.response.data.message || "Error from server");
      } else {
        showModal("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card p-4 shadow-sm rounded-3 w-100"
        style={{ maxWidth: "450px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
            <label className="form-label">Password</label>
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
            <label className="form-label">Company Name</label>
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
            <label className="form-label">Address Line 1</label>
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
            <label className="form-label">Address Line 2</label>
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
            <label className="form-label">City</label>
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
            <label className="form-label">State</label>
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
            <label className="form-label">Zip Code</label>
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
              <a href="/tos" className="text-decoration-none" target="_blank">
                Terms of Service
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isButtonDisabled}
          >
            {isSpinnerVisible && (
              <span className="spinner-border spinner-border-sm me-2"></span>
            )}
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none">
            Login
          </a>
        </p>
      </div>
      <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
    </div>
  );
};

export default SignUpForm;
