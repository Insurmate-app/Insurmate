import React, { useState } from "react";

import axios from "axios";
import * as yup from "yup";

const AddPolicyModal = ({ showModal, setShowModal, onAddPolicy }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    policyNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .max(100, "Email must be no more than 100 characters long")
      .required("Email is required"),
    status: yup.string().required("Status is required"),
    policyNumber: yup
      .string()
      .min(6, "Policy number must be at least 6 characters")
      .max(10, "Policy number must be no more than 10 characters")
      .matches(/^[A-Za-z0-9]+$/, "Policy Number must be alphanumeric")
      .required("Policy Number is required"),
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Validate form fields
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    console.log("Payload being sent:", { data: formValues });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/asset/create`,
        { data: formValues }, // Correct payload structure
        { withCredentials: true },
      );
      onAddPolicy(response.data); // Pass the new policy back to the parent
      setShowModal(false); // Close modal
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        status: "",
        policyNumber: "",
      }); // Reset form
    } catch (error) {
      console.error("Error adding policy:", error);
      setErrors({ submit: "Error adding policy. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showModal) return null; // Don't render modal if not visible

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Policy</h5>
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
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.firstName && (
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.lastName && (
                  <div className="text-danger">{errors.lastName}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.status && (
                  <div className="text-danger">{errors.status}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Policy Number</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formValues.policyNumber}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.policyNumber && (
                  <div className="text-danger">{errors.policyNumber}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
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

export default AddPolicyModal;
