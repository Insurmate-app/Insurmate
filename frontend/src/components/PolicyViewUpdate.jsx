import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import * as yup from "yup";

import ClientError from "./ClientError";
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
  const [failedToFetch, setFailedToFetch] = useState(false);
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
        console.error("Error fetching policy data:", error);
        setFailedToFetch(true);
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
    <>
      {failedToFetch && <ClientError />}
      <div className="container mt-5">
        {isLoading && <RubikSpinner />}
        {isSubmitting && <RubikSpinner />}
        <ToastComponent />
        <div className="card shadow-lg border-0 rounded-3">
          <div className="card-header bg-white border-0 py-4">
            <h2 className="text-center mb-0 fw-bold">View / Update Policy</h2>
          </div>

          {errors.submit && (
            <div className="alert alert-danger mx-4">{errors.submit}</div>
          )}

          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Asset ID Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="assetId"
                      id="assetId"
                      value={formValues.assetId}
                      className={`form-control ${errors.assetId ? "is-invalid" : ""}`}
                      readOnly
                    />
                    <label htmlFor="assetId">Asset ID</label>
                    {errors.assetId && (
                      <div className="invalid-feedback">{errors.assetId}</div>
                    )}
                  </div>
                </div>

                {/* Owner Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="owner"
                      id="owner"
                      value={formValues.owner}
                      className={`form-control ${errors.owner ? "is-invalid" : ""}`}
                      readOnly
                    />
                    <label htmlFor="owner">Owner</label>
                    {errors.owner && (
                      <div className="invalid-feedback">{errors.owner}</div>
                    )}
                  </div>
                </div>

                {/* First Name Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formValues.firstName}
                      onChange={handleChange}
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    />
                    <label htmlFor="firstName">First Name</label>
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formValues.lastName}
                      onChange={handleChange}
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formValues.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Policy Number Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="policyNumber"
                      id="policyNumber"
                      value={formValues.policyNumber}
                      onChange={handleChange}
                      className={`form-control ${errors.policyNumber ? "is-invalid" : ""}`}
                    />
                    <label htmlFor="policyNumber">Policy Number</label>
                    {errors.policyNumber && (
                      <div className="invalid-feedback">
                        {errors.policyNumber}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <select
                      name="status"
                      id="status"
                      value={formValues.status}
                      onChange={handleChange}
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Active">Active</option>
                      <option value="Verified">Verified</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <label htmlFor="status">Status</label>
                    {errors.status && (
                      <div className="invalid-feedback">{errors.status}</div>
                    )}
                  </div>
                </div>

                {/* Expiration Date Field */}
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="expirationDate"
                      id="expirationDate"
                      value={formValues.expirationDate}
                      className="form-control"
                      readOnly
                    />
                    <label htmlFor="expirationDate">Expiration Date</label>
                  </div>
                </div>
              </div>

              {/* AI Analysis Section */}
              <div className="mt-4">
                <h5 className="mb-3">AI Analysis</h5>
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center">
                          <strong className="me-2">Confidence Score:</strong>
                          <span>
                            {formValues.llmResponse?.confidenceScore || "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center">
                          <strong className="me-2">Validation Status:</strong>
                          <span
                            className={`badge ${formValues.llmResponse?.valid ? "bg-success" : "bg-danger"}`}
                          >
                            {formValues.llmResponse?.valid
                              ? "Valid"
                              : "Invalid"}
                          </span>
                        </div>
                      </div>
                      <div className="col-12">
                        <strong className="d-block mb-2">
                          Analysis Notes:
                        </strong>
                        <p className="mb-0 text-secondary">
                          {formValues.llmResponse?.reason ||
                            "No analysis available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div
        className="position-fixed bottom-0 start-0 end-0 p-4 bg-white shadow-lg"
        style={{
          zIndex: 1000,
          borderTop: "1px solid #dee2e6",
        }}
      >
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary px-4 py-2"
            onClick={handleBack}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>
          <button
            type="button"
            className="btn btn-light"
            style={{
              backgroundColor: "#f8c471",
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Updating...</>
            ) : (
              <>
                <i className="bi bi-check2 me-2"></i>
                Update Policy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind floating buttons */}
      <div style={{ paddingBottom: "80px" }}></div>
    </>
  );
};

export default PolicyViewUpdate;
