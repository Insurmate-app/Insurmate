import React, { useEffect, useState } from "react";

import axios from "axios";

const AssetHistory = () => {
  const params = new URLSearchParams(window.location.search);
  const assetId = params.get("id");

  if (!assetId) {
    window.location.href = "/dashboard";
  }
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/asset/history/${assetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setHistory(response.data.history || []);
      } catch (err) {
        console.error("Error fetching asset history:", err);
        setError("Failed to load asset history. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (assetId) {
      fetchHistory();
    }
  }, [assetId]);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading asset history...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Asset History</h3>
      <pre
        style={{ background: "#f8f9fa", padding: "10px", borderRadius: "5px" }}
      >
        {JSON.stringify(history, null, 2)}
      </pre>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AssetHistory;
