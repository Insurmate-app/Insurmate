import React from "react";
import useSignUpForm from "../hooks/signup/useSignUpForm";
import useSpinner from "../hooks/useSpinner";
import useModal from "../hooks/useModal";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";

const base_url = import.meta.env.VITE_API_BASE_URL;
const signup_url = base_url + "/auth/user/register";

const SignUpForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    phone,
    setPhone,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    businessName,
    setBusinessName,
    isTermsAccepted,
    setIsTermsAccepted,
    isButtonDisabled,
    setIsButtonDisabled,
  } = useSignUpForm();

  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();

  const validationSchema = Yup.object().shape({
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
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        "Phone number must be in the format XXX-XXX-XXXX"
      ),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    businessName: Yup.string().required("Business name is required"),
    isTermsAccepted: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const form = {
    email: email,
    password: password,
    phone: phone,
    firstName: firstName,
    lastName: lastName,
    businessName: businessName,
    isTermsAccepted: isTermsAccepted,
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsButtonDisabled(
      e.target.value === "" ||
        password === "" ||
        phone === "" ||
        firstName === "" ||
        lastName === "" ||
        businessName === "" ||
        !isTermsAccepted
    );
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsButtonDisabled(
      e.target.value === "" ||
        email === "" ||
        phone === "" ||
        firstName === "" ||
        lastName === "" ||
        businessName === "" ||
        isTermsAccepted
    );
  };

  const handlePhoneChange = (e) => {
    let num = e.target.value;
    num = num.replace(/\D/g, "");
    if (num.length > 10) {
      num = num.slice(0, 10);
    }

    if (num.length > 3 && num.length <= 6) {
      num = num.replace(/(\d{3})(\d{1,3})/, "$1-$2");
    } else if (num.length > 6) {
      num = num.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3");
    }

    setPhone(num);

    setIsButtonDisabled(
      e.target.value === "" ||
        email === "" ||
        password === "" ||
        firstName === "" ||
        lastName === "" ||
        businessName === "" ||
        isTermsAccepted
    );
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);

    setIsButtonDisabled(
      e.target.value === "" ||
        email === "" ||
        password === "" ||
        phone === "" ||
        lastName === "" ||
        businessName === "" ||
        isTermsAccepted
    );
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);

    setIsButtonDisabled(
      e.target.value === "" ||
        email === "" ||
        password === "" ||
        phone === "" ||
        firstName === "" ||
        businessName === "" ||
        isTermsAccepted
    );
  };

  const handleBusinessNameChange = (e) => {
    setBusinessName(e.target.value);

    setIsButtonDisabled(
      e.target.value === "" ||
        email === "" ||
        password === "" ||
        phone === "" ||
        firstName === "" ||
        lastName === "" ||
        isTermsAccepted === true
    );
  };

  const handleTermAcceptedChange = (e) => {
    const newValue = e.target.checked; // Get the checked state directly from the event
    setIsTermsAccepted(newValue); // Update the state

    setIsButtonDisabled(
      isTermsAccepted ||
        email === "" ||
        password === "" ||
        phone === "" ||
        firstName === "" ||
        lastName === "" ||
        businessName === ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    activateSpinner();
    setIsButtonDisabled(true);

    try {
      await validationSchema.validate(form, { abortEarly: false });
      console.log("Validation passed");

      await axios.post(signup_url, {
        userDto: {
          email: email,
          password: password,
          userProfileDto: {
            userFirstName: firstName,
            userLastname: lastName,
            businessName: businessName,
            autoUpdate: true,
            phone: phone,
          },
        },
        role: "agent",
      });
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="signup-container card p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <form id="signup-form" onSubmit={handleSubmit}>
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
              Password
            </label>
            <div className="input-group">
              <input
                required
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
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

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="123-456-7890"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="John"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Doe"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="businessName" className="form-label">
              Business Name
            </label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="We Care Insurnace Inc."
              value={businessName}
              onChange={handleBusinessNameChange}
            />
          </div>
          <div className="mb-3 p-2 rounded border border-1">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={isTermsAccepted}
                onChange={handleTermAcceptedChange}
              />
              <label htmlFor="terms" className="form-check-label">
                I agree to the{" "}
                <a href="https://manage-insurance.com/html/tos.html">
                  Terms of Service
                </a>
              </label>
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
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
    </div>
  );
};

export default SignUpForm;
