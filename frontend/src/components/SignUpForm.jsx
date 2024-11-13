import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import useSignUpForm from "../hooks/signup/useSignUpForm";
import useSpinner from "../hooks/useSpinner";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext"; // Ensure correct import
import axios from "axios";
import * as Yup from "yup";

const base_url = import.meta.env.VITE_API_BASE_URL;
const signup_url = `${base_url}/user/create`;

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  error,
}) => (
  <div className="mb-3">
    <label className="form-label mb-1">{label}</label>
    <input
      type={type}
      className="form-control border-0 border-bottom rounded-0"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{ paddingLeft: "5px" }}
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

  const { setEmail: setContextEmail } = useContext(UserContext); // Correct context property
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email address").required(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[!@#$%^&*]/, "Must contain a special character")
      .required(),
    companyName: Yup.string()
      .required("Company name is required")
      .min(8, "Company name must be at least 8 characters")
      .max(28, "Company name must not exceed 28 characters"),
    address: Yup.object().shape({
      addressLine1: Yup.string().required(),
      addressLine2: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, "Zip code must be 5 digits")
        .required(),
    }),
    isTermsAccepted: Yup.boolean().oneOf([true], "Accept the terms"),
  });

  const form = {
    email,
    password,
    companyName,
    address,
    isTermsAccepted,
  };

  const checkFormCompletion = () => {
    setIsButtonDisabled(!Object.values(form).every((field) => field));
  };

  useEffect(() => {
    checkFormCompletion();
  }, [email, password, companyName, address, isTermsAccepted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();
    setIsButtonDisabled(true);

    try {
      await validationSchema.validate(form, { abortEarly: false });

      await axios.post(signup_url, {
        email: email,
        password: password,
        companyName: companyName,
        address: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        },
      });

      showModal("Sign up successful");
      setContextEmail(email); // Use setContextEmail instead of setContextEmail
      navigate("/activate-account");
    } catch (err) {
      deactivateSpinner();
      setIsButtonDisabled(false);
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
            <label className="form-label mb-1">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control border-0 border-bottom rounded-0"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "5px" }}
              />
              <span
                className="input-group-text bg-transparent border-0"
                onClick={togglePasswordVisibility}
                role="button"
                aria-label="Toggle password visibility"
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
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

          {/* Responsive Address Fields */}
          <div className="row">
            <div className="col-12 mb-3">
              <InputField
                label="Address Line 1"
                type="text"
                placeholder="123 Main St"
                value={address.addressLine1}
                onChange={(e) =>
                  setAddress({ ...address, addressLine1: e.target.value })
                }
              />
            </div>
            <div className="col-12 mb-3">
              <InputField
                label="Address Line 2"
                type="text"
                placeholder="Apt, Suite, etc."
                value={address.addressLine2}
                onChange={(e) =>
                  setAddress({ ...address, addressLine2: e.target.value })
                }
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <InputField
                label="City"
                type="text"
                placeholder="New York"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                required
              />
            </div>
            <div className="col-6 col-md-3 mb-3">
              <InputField
                label="State"
                type="text"
                placeholder="NY"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
                required
              />
            </div>
            <div className="col-6 col-md-3 mb-3">
              <InputField
                label="Zip Code"
                type="text"
                placeholder="10001"
                value={address.zipCode}
                onChange={(e) =>
                  setAddress({ ...address, zipCode: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="mb-3 form-check">
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
            className="btn btn-gradient rounded-pill w-100 mb-3"
            disabled={isButtonDisabled}
            style={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "#fff",
              transition: "0.3s",
            }}
          >
            {isSpinnerVisible && (
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></span>
            )}{" "}
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
      <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
    </div>
  );
};

export default SignUpForm;
