import React, { useEffect, useState } from "react";

import axios from "axios";
import * as yup from "yup";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/asset`;

const PolicyViewUpdate = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id){
    window.location.href = "/dashboard";
  }

  const [formValues, setFormValues] = useState({
    assetId: "",
    firstName: "",
    lastName: "",
    email: "",
    policyNumber: "",
    owner: "",
    status: "Pending", // Default status
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const validationSchema = yup.object().shape({
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
    assetId: yup.string().required("Policy ID is required"),
    owner: yup.string().required("Owner is required"),
    status: yup
      .string()
      .oneOf(["Pending", "Active", "Inactive"], "Invalid status")
      .required("Status is required"),
  });

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${baseURL}/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const policyData = response.data.data;

        // Update the state with the extracted values
        setFormValues({
          assetId: id,
          firstName: policyData.firstName || "",
          lastName: policyData.lastName || "",
          email: policyData.email || "",
          policyNumber: policyData.policyNumber || "",
          owner: policyData.owner || "",
          status: policyData.status || "Pending",
        });
      } catch (error) {
        console.error("Error fetching policy data:", error);
        alert("Failed to load policy details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolicy();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found in localStorage");
      }

      const updatePayload = {
        id: id,
        data: {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          policyNumber: formValues.policyNumber,
          owner: formValues.owner,
          status: formValues.status,
        },
      };

      await axios.put(`${baseURL}/update`, updatePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Policy updated successfully!");
    } catch (error) {
      console.error("Error updating policy:", error);
      setErrors({ submit: "Failed to update the policy. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    window.location.href = "/dashboard";
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading policy details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">View / Update Policy</h2>

        {errors.submit && (
          <div className="alert alert-danger">{errors.submit}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Existing Fields */}
          <div className="mb-3">
            <label className="form-label">Asset ID</label>
            <input
              type="text"
              name="assetId"
              value={formValues.assetId}
              className={`form-control ${errors.owner ? "is-invalid" : ""}`}
              readOnly
            />
            {errors.assetId && (
              <div className="text-danger">{errors.assetId}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
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
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
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
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Policy Number</label>
            <input
              type="text"
              name="policyNumber"
              value={formValues.policyNumber}
              onChange={handleChange}
              className={`form-control ${
                errors.policyNumber ? "is-invalid" : ""
              }`}
            />
            {errors.policyNumber && (
              <div className="text-danger">{errors.policyNumber}</div>
            )}
          </div>

          {/* New Fields */}
          <div className="mb-3">
            <label className="form-label">Owner</label>
            <input
              type="text"
              name="owner"
              value={formValues.owner}
              className={`form-control ${errors.owner ? "is-invalid" : ""}`}
              readOnly
            />
            {errors.owner && <div className="text-danger">{errors.owner}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className={`form-control ${errors.status ? "is-invalid" : ""}`}
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <div className="text-danger">{errors.status}</div>
            )}
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Policy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PolicyViewUpdate;
