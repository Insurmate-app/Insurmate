// AddPolicyModal.jsx
import React, { useState } from "react";

import axios from "axios";

const AddPolicyModal = ({ showModal, setShowModal, onAddPolicy }) => {
  const [newPolicy, setNewPolicy] = useState({
    firstName: "",
    lastName: "",
    status: "",
    policyNumber: "",
  });
  const [error, setError] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy((prevPolicy) => ({
      ...prevPolicy,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleAddPolicy = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("/api/assets", newPolicy); // Replace with actual endpoint
      onAddPolicy(response.data); // Pass the new policy back to the parent
      setShowModal(false); // Close modal after adding
      setNewPolicy({
        firstName: "",
        lastName: "",
        status: "",
        policyNumber: "",
      }); // Reset form
    } catch (error) {
      setError("Error adding policy");
      console.error("Error adding policy:", error);
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
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleAddPolicy}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={newPolicy.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={newPolicy.lastName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newPolicy.status}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Policy Number</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={newPolicy.policyNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Policy
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPolicyModal;
