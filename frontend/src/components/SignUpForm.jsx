import React, { useEffect } from "react";

import axios from "axios";
import * as Yup from "yup";

import useSignUpForm from "../hooks/signup/useSignUpForm";
import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";

// InputField Component
const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type={type}
      className="form-control border-0 border-bottom rounded-0"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <small className="text-danger">{error}</small>}
  </div>
);

const SignUpForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    companyName,
    setCompanyName,
    address,
    setAddress,
    showPassword,
    togglePasswordVisibility,
    isTermsAccepted,
    setIsTermsAccepted,
    isButtonDisabled,
    setIsButtonDisabled,
  } = useSignUpForm();
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
    address: Yup.object().shape({
      addressLine1: Yup.string().required("Address line 1 is required"),
      addressLine2: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, "Zip code must be 5 digits")
        .required("Zip code is required"),
    }),
    isTermsAccepted: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  // Form data
  const formData = { email, password, companyName, address, isTermsAccepted };

  // Validate and check if the form is complete
  const checkFormCompletion = () =>
    setIsButtonDisabled(!Object.values(formData).every((field) => field));

  useEffect(
    () => checkFormCompletion(),
    [email, password, companyName, address, isTermsAccepted],
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // API call
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/create`,
        formData,
      );

      window.location.href = `/activate?email=${encodeURIComponent(email)}`;
    } catch (err) {
      deactivateSpinner();
      if (err.name === "ValidationError") {
        showModal(err.errors.join("\n"));
      } else if (err.response) {
        showModal(err.response.data.message || "Error from server");
      } else {
        showModal("An unexpected error occurred");
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card p-4 shadow-sm rounded-3 w-100"
        style={{ maxWidth: "450px" }}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="input-group-text bg-transparent border-0"
                onClick={togglePasswordVisibility}
                role="button"
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </span>
            </div>
          </div>
          <InputField
            label="Company Name"
            type="text"
            placeholder="ABC Corporation"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <InputField
            label="Address Line 1"
            type="text"
            placeholder="123 Main St"
            value={address.addressLine1}
            onChange={(e) =>
              setAddress({ ...address, addressLine1: e.target.value })
            }
          />
          <InputField
            label="City"
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <InputField
            label="State"
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
          <InputField
            label="Zip Code"
            type="text"
            placeholder="12345"
            value={address.zipCode}
            onChange={(e) =>
              setAddress({ ...address, zipCode: e.target.value })
            }
          />
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            <label className="form-check-label">
              I agree to the{" "}
              <a href="#" className="text-decoration-none">
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
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
            )}{" "}
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
