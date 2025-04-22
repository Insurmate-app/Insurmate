import { useEffect, useState } from "react";

import RubikSpinner from "./RubikSpinner";
import { useApi } from "./useApi";

const AssetHistory = () => {
  const params = new URLSearchParams(window.location.search);
  const assetId = params.get("id");

  const api = useApi();

  if (!assetId) {
    window.location.href = "/dashboard";
  }
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get(`/asset/history/${assetId}`);

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

  return (
    <div className="container mt-4">
      {isLoading && <RubikSpinner />}
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <h3 className="mb-4">Asset History</h3>
      <pre
        style={{ background: "#f8f9fa", padding: "10px", borderRadius: "5px" }}
      >
        {JSON.stringify(history, null, 2)}
      </pre>

      {/* Floating back button */}
      <button
        type="button"
        className="btn btn-secondary rounded-circle"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backgroundColor: "#6c757d", // A lighter gray color
          border: "none",
        }}
        onClick={() =>
          document.startViewTransition(() => {
            window.location.href = "/dashboard";
          })
        }
      >
        <i className="bi bi-arrow-left" style={{ fontSize: "1.5rem" }}></i>
      </button>
    </div>
  );
};

export default AssetHistory;
