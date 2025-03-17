import { useCallback, useMemo, useState } from "react";

import * as Yup from "yup";

import { encodeBase64 } from "../functions/base64";
import { obfuscate } from "../functions/obfs";
import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";
import { useApi } from "./useApi";

const SignUpForm = () => {
  const api = useApi();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
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
  const [ touchedFields, setTouchedFields ] = useState({});

  // Memoized validation schema
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        firstName: Yup.string()
          .required("First name is required")
          .max(50, "No more than 50 characters"),
        lastName: Yup.string()
          .required("Last name is required")
          .max(50, "No more than 50 characters"),  
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

  const validateField = useCallback(
    async (name, value) => {
      try {
        await Yup.reach(validationSchema, name).validate(value);
        setErrors((prev) => ({ ...prev, [name]: null }));
      } catch (err) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    },
    [validationSchema]
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

      if (!touchedFields[name]) {
        setTouchedFields((prev) => ({ ...prev, [name]: true }));
      }

      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }));
      }
    },
    [errors, validationSchema, touchedFields],
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;


      setTouchedFields((prev) => ({ ...prev, [name]: true }));
      validateField(name, fieldValue);
    },
    [validateField]
  );

  const currentErrors = useMemo(() => {
    return Object.entries(errors)
      .filter(([key, value]) => touchedFields[key] && value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }, [errors, touchedFields]);
  
  // Optimized submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      activateSpinner();

      try {
        await validationSchema.validate(formValues, { abortEarly: false });
        setErrors({});

        const payload = {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
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
          // Leaving in this line for now to prevent errors
          wallet: "0",
        };

        await api.post(`/user/create`, payload);

        const obfuscated_email = encodeBase64(obfuscate(formValues.email));

        window.location.href = `/activate?ep=${encodeURIComponent(
          obfuscated_email,
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
    <div>
      <header className="d-flex justify-content-between align-items-center w-100 p-3 bg-light shadow-sm">
      <div className="logo d-flex align-items-center">
          <a href="/">
            <img
              src="/insurmate_logo.png"
              alt="Insurmate Logo"
              className="me-2"
              style={{ height: "40px" }}
            />
          </a>  
            <h1 className="h5 text-dark mb-0">Insurmate</h1>
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-dark" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/collaboration">
                Collaboration
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/contact">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </header>

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

        {Object.keys(currentErrors).length > 0 && (
          <div className="alert alert-danger mb-3">
            <h6 className="mb-1">Please correct the following issues:</h6>
            <u1 className="mb-0 ps-3">
              {Object.entries(currentErrors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </u1>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">
              First Name <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              name="firstName"
              className={`form-control border-0 border-bottom rounded-0 ${
                touchedFields.firstName && errors.firstName ? "is-invalid" : ""
              }`}
              placeholder="John"
              value={formValues.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.firstName && errors.firstName && (
              <small className="text-danger">{errors.firstName}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Last Name <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="text"
              name="lastName"
              className={`form-control border-0 border-bottom rounded-0 ${
                touchedFields.lastName && errors.lastName ? "is-invalid" : ""
              }`}
              placeholder="Doe"
              value={formValues.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.lastName && errors.lastName && (
              <small className="text-danger">{errors.lastName}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">
              Email <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              type="email"
              name="email"
              className={`form-control border-0 border-bottom rounded-0 ${
                touchedFields.email && errors.email ? "is-invalid" : ""
              }`}
              placeholder="user@example.com"
              value={formValues.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.email && errors.email && (
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
                  touchedFields.Password && errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password"
                value={formValues.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
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
            {touchedFields.password && errors.password && (
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
                touchedFields.companyName && errors.companyName ? "is-invalid" : ""
              }`}
              placeholder="ABC Corporation"
              value={formValues.companyName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.companyName && errors.companyName && (
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
                touchedFields.addressLine1 && errors.addressLine1 ? "is-invalid" : ""
              }`}
              placeholder="123 Main St"
              value={formValues.addressLine1}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.addressLine1 && errors.addressLine1 && (
              <small className="text-danger">{errors.addressLine1}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              className={`form-control border-0 border-bottom rounded-0 ${
                touchedFields.addressLine2 && errors.addressLine2 ? "is-invalid" : ""
              }`}
              placeholder="Apt 1"
              value={formValues.addressLine2}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touchedFields.addressLine2 && errors.addressLine2 && (
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
                touchedFields.city && errors.city ? "is-invalid" : ""
              }`}
              placeholder="City"
              value={formValues.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.city && errors.city && (
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
                touchedFields.state && errors.state ? "is-invalid" : ""
              }`}
              placeholder="State"
              value={formValues.state}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.state && errors.state && (
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
                touchedFields.zipCode && errors.zipCode ? "is-invalid" : ""
              }`}
              placeholder="12345"
              value={formValues.zipCode}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
            />
            {touchedFields.zipCode && errors.zipCode && (
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
            disabled={isSpinnerVisible}
            style={{
              backgroundColor: isSpinnerVisible ? "#ccc" : "#333",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: isSpinnerVisible ? "not-allowed" : "pointer",
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
    </div>
  );
};

export default SignUpForm;
