import React, { useState } from "react";
import axios from "axios";
import AddPolicyModal from "./AddPolicy";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(""); // Replace with actual endpoint
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Callback to handle adding a new policy
  const handleAddPolicy = (newPolicy) => {
    setData((prevData) => [...prevData, newPolicy]); // Add new policy to data without refetching
  };

  return (
    <div className="container my-4">
      <h2 className="text-primary mb-3">Policy Dashboard</h2>
      <button onClick={fetchData} className="btn btn-primary mb-4 me-2">
        Refresh Data
      </button>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-success mb-4"
      >
        Add Policy
      </button>

      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Policy Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((policy, index) => (
              <tr key={index}>
                <td>{policy.firstName}</td>
                <td>{policy.lastName}</td>
                <td>{policy.status}</td>
                <td>{policy.policyNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add Policy Modal */}
      <AddPolicyModal
        showModal={showModal}
        setShowModal={setShowModal}
        onAddPolicy={handleAddPolicy}
      />
    </div>
  );
};

export default Dashboard;
