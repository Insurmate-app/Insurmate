import React, { useEffect, useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import fileSaver from "file-saver";
import Papa from "papaparse";

import AddPolicyModal from "./AddPolicy";
import { useApi } from "./useApi";

const Dash = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/asset/get-all`);

        const transformedData = await response.data.map((item) => ({
          id: item.id,
          ...item.data,
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        window.location.href = "/login";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // WebSocket setup
    const ws = new WebSocket(import.meta.env.VITE_WS_URL); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        // Handle policy list update
        if (message.type === "ASSET_LIST_UPDATE") {
          console.log("Received asset list update:", message.data);
          const transformedData = message.data.map((item) => ({
            id: item.id,
            ...item.data,
          }));

          setData(transformedData);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const handleAddPolicy = (newPolicy) => {
    setShowModal(false);
    // No need to reload the page as WebSocket will update the data
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    fileSaver.saveAs(blob, "policies.csv");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this policy?",
    );
    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      await api.delete(`/asset/delete/${id}`);

      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Policy deleted successfully.");
    } catch (error) {
      console.error("Error deleting policy:", error);
      alert("Failed to delete policy. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const columns = useMemo(
    () => [
      { field: "firstName", headerName: "First Name", flex: 1 },
      { field: "lastName", headerName: "Last Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "owner", headerName: "Owner", flex: 1 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
          const status = params.row.status;
          return (
            <span
              className={`badge ${
                status === "Active"
                  ? "bg-success"
                  : status === "Pending"
                    ? "bg-warning text-dark"
                    : "bg-secondary"
              }`}
            >
              {params.row.status}
            </span>
          );
        },
      },
      { field: "policyNumber", headerName: "Policy Number", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        sortable: false,
        renderCell: (params) => {
          const isDeleting = deletingId === params.row.id;

          return (
            <>
              <button
                className="btn btn-link text-info"
                title="View"
                onClick={() => {
                  window.location.href = `/policy?id=${encodeURIComponent(params.row.id)}`;
                }}
                disabled={isDeleting}
              >
                <i className="bi bi-eye-fill"></i>
              </button>
              <button
                className="btn btn-link text-info"
                title="History"
                onClick={() => {
                  window.location.href = `/history?id=${encodeURIComponent(params.row.id)}`;
                }}
              >
                <i className="bi bi-clock-history"></i>
              </button>
              <button
                className="btn btn-link text-danger"
                title="Delete Policy"
                onClick={() => handleDelete(params.row.id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span
                    className="spinner-border spinner-border-sm text-danger"
                    role="status"
                  ></span>
                ) : (
                  <i className="bi bi-trash-fill"></i>
                )}
              </button>
            </>
          );
        },
      },
    ],
    [deletingId],
  );

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row || {}).some((value) =>
        value?.toString().toLowerCase().includes(globalFilter.toLowerCase()),
      ),
    );
  }, [data, globalFilter]);

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
    <div className="container my-4">
      <h2 className="text-dark mb-3">Policy Dashboard</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-outline-primary d-flex align-items-center"
            style={{ borderRadius: "8px" }}
          >
            <i
              className="bi bi-plus-lg me-2"
              style={{ color: "#0d6efd", fontSize: "1.2rem" }}
            ></i>
            Add Policy
          </button>
          <button
            onClick={handleExportCSV}
            className="btn btn-outline-success d-flex align-items-center"
            style={{ borderRadius: "8px" }}
          >
            <i
              className="bi bi-download me-2"
              style={{ color: "#198754", fontSize: "1.2rem" }}
            ></i>
            Export to CSV
          </button>
        </div>
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns..."
          className="form-control w-25"
          style={{ borderRadius: "8px" }}
        />
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.id}
          checkboxSelection
        />
      </div>
      <AddPolicyModal
        showModal={showModal}
        setShowModal={setShowModal}
        onAddPolicy={handleAddPolicy}
      />
    </div>
  );
};

export default Dash;
