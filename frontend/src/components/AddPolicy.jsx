import React, { useCallback, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import * as yup from "yup";

import { useApi } from "./useApi";

const AddPolicyModal = ({ showModal, setShowModal, onAddPolicy }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    policyNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api = useApi();

  // Memoize validation schema
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup
          .string()
          .email("Invalid email format")
          .max(100, "Email must be no more than 100 characters long")
          .required("Email is required"),
        policyNumber: yup
          .string()
          .min(6, "Policy number must be at least 6 characters")
          .max(10, "Policy number must be no more than 10 characters")
          .matches(/^[A-Za-z0-9]+$/, "Policy Number must be alphanumeric")
          .required("Policy Number is required"),
      }),
    [],
  );

  // Optimize form handling
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors],
  );

  const validateForm = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const isValid = await validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await api.post(`/asset/create`, {
          data: { ...formValues },
        });

        onAddPolicy(response.data);
        setShowModal(false);
        setFormValues({
          firstName: "",
          lastName: "",
          email: "",
          policyNumber: "",
        });
      } catch (error) {
        console.error("Error adding policy:", error);
        setErrors({ submit: "Error adding policy. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formValues, validateForm, api, onAddPolicy, setShowModal],
  );

  if (!showModal) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addPolicyModal"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className="modal-content p-4 shadow rounded"
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
          }}
        >
          <div className="modal-header border-0">
            <h5 className="modal-title" style={{ color: "#333" }}>
              Add Policy
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {errors.submit && (
              <div className="alert alert-danger">{errors.submit}</div>
            )}
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                {errors.firstName && (
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                {errors.lastName && (
                  <div className="text-danger">{errors.lastName}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              {/* Policy Number */}
              <div className="mb-3">
                <label className="form-label fw-bold">
                  Policy Number <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formValues.policyNumber}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.policyNumber ? "is-invalid" : ""
                  }`}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                {errors.policyNumber && (
                  <div className="text-danger">{errors.policyNumber}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: isSubmitting ? "#ccc" : "#333",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Policy"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddPolicyModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onAddPolicy: PropTypes.func.isRequired,
};

export default React.memo(AddPolicyModal);
