import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import * as yup from "yup";

import RubikSpinner from "./RubikSpinner";
import ToastComponent from "./ToastComponent";
import { useApi } from "./useApi";

const PolicyViewUpdate = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const api = useApi();

  const [formValues, setFormValues] = useState({
    assetId: "",
    firstName: "",
    lastName: "",
    email: "",
    policyNumber: "",
    owner: "",
    status: "Pending",
    llmResponse: null,
    expirationDate: "", // Add this line
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
          .max(100, "Policy number must be no more than 100 characters")
          .required("Policy Number is required"),
        assetId: yup.string().required("Policy ID is required"),
        owner: yup.string().required("Owner is required"),
        status: yup
          .string()
          .oneOf(
            ["Pending", "Active", "Inactive", "Verified"],
            "Invalid status",
          )
          .required("Status is required"),
      }),
    [],
  );

  // Run the policy fetch only once on mount.
  useEffect(() => {
    if (!id) {
      window.location.href = "/dashboard";
      return;
    }

    const fetchPolicy = async () => {
      try {
        const response = await api.get(`/asset/get/${id}`);
        const policyData = response.data.data;

        const llmResponse = policyData.llmResponse;

        setFormValues((prevValues) => ({
          ...prevValues,
          assetId: id,
          firstName: policyData.firstName || "",
          lastName: policyData.lastName || "",
          email: policyData.email || "",
          policyNumber: policyData.policyNumber || "",
          owner: policyData.owner || "",
          status: policyData.status || "Pending",
          llmResponse: llmResponse || null,
          expirationDate: llmResponse?.expirationDate || "", // Add this line
        }));
      } catch (error) {
        toast.error("Error fetching policy data:", error);
        showModal("Failed to load policy details. Please try again.");
        window.location.href = "/dashboard";
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dependency array ensures the effect runs only once on mount

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const validateForm = useCallback(async () => {
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
  }, [formValues, validationSchema]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const isValid = await validateForm();
        if (!isValid) return;

        const updatePayload = {
          id,
          data: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            policyNumber: formValues.policyNumber,
            owner: formValues.owner,
            status: formValues.status,
          },
        };

        await api.put(`/asset/update`, updatePayload);
        toast.success("Policy updated successfully!");
      } catch (error) {
        toast.error("Error updating policy:", error);
        setErrors({ submit: "Failed to update the policy. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formValues, id, api, validateForm],
  );

  const handleBack = useCallback(() => {
    document.startViewTransition(() => {
      window.location.href = "/dashboard";
    });
  }, []);

  return (
    <div className="container mt-5">
      {isLoading && <RubikSpinner />}
      {isSubmitting && <RubikSpinner />}
      <ToastComponent />
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
              className={`form-control ${errors.assetId ? "is-invalid" : ""}`}
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
              className={`form-control ${errors.policyNumber ? "is-invalid" : ""}`}
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
              <option value="Verified">Verified</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <div className="text-danger">{errors.status}</div>
            )}
          </div>

          {/* LLM Response Section */}
          <div className="mb-3">
            <label className="form-label">Expiration Date</label>
            <input
              type="text"
              name="expirationDate"
              value={formValues.expirationDate}
              className="form-control"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">AI Analysis</label>
            <div className="card">
              <div className="card-body">
                <div className="mb-2">
                  <strong>Confidence Score: </strong>
                  {formValues.llmResponse?.confidenceScore || "N/A"}
                </div>
                <div className="mb-2">
                  <strong>Validation Status: </strong>
                  <span
                    className={`badge ${formValues.llmResponse?.valid ? "bg-success" : "bg-danger"}`}
                  >
                    {formValues.llmResponse?.valid ? "Valid" : "Invalid"}
                  </span>
                </div>
                <div>
                  <strong>Analysis Notes: </strong>
                  <p className="mb-0">
                    {formValues.llmResponse?.reason || "No analysis available"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-light"
              style={{
                backgroundColor: "#95a5a6",
              }}
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn-light"
              style={{
                backgroundColor: "#f8c471",
              }}
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
