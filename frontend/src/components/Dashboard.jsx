import React, { useEffect, useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import fileSaver from "file-saver";
import Papa from "papaparse";

// Import Modal Component
import AddPolicyModal from "./AddPolicy";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/asset`;

const Dash = () => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found in localStorage");

        const response = await axios.get(`${baseURL}/get-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Transform the data to flatten the structure
        const transformedData = response.data.map((item) => ({
          id: item.id, // Keep the id
          ...item.data, // Spread the fields inside the `data` object to the top level
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new policy
  const handleAddPolicy = (newPolicy) => {
    setShowModal(false);

    ///refresh the page
    // TODO: find a better way. consider using websocket
    window.location.reload();
  };

  // Handle CSV export
  const handleExportCSV = () => {
    const csv = Papa.unparse(data); // Convert data to CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Create CSV Blob
    fileSaver.saveAs(blob, "policies.csv"); // Trigger download
  };

  // Define DataGrid columns
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
          const handleDelete = async (id) => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this policy?",
            );
            if (!confirmDelete) return; // Exit if the user cancels

            try {
              const token = localStorage.getItem("token");
              if (!token) throw new Error("Token not found in localStorage");

              await axios.delete(`${baseURL}/delete/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              setData((prev) => prev.filter((item) => item.id !== id));
              alert("Policy deleted successfully.");
            } catch (error) {
              console.error("Error deleting policy:", error);
              alert("Failed to delete policy. Please try again.");
            }
          };

          return (
            <>
              <button
                className="btn btn-link text-info"
                title="View"
                onClick={() =>
                  alert(`View details of ${params.row?.name || ""}`)
                }
              >
                <i className="bi bi-eye-fill"></i>
              </button>
              <button
                className="btn btn-link text-danger"
                title="Delete Policy"
                onClick={() => handleDelete(params.row.id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </>
          );
        },
      },
    ],
    [],
  );

  // Filter data based on global search
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row || {}).some((value) =>
        value?.toString().toLowerCase().includes(globalFilter.toLowerCase()),
      ),
    );
  }, [data, globalFilter]);

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
        {/* Global Search */}
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

      {/* Add Policy Modal */}
      <AddPolicyModal
        showModal={showModal}
        setShowModal={setShowModal}
        onAddPolicy={handleAddPolicy}
      />
    </div>
  );
};

export default Dash;
