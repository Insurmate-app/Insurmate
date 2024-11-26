import React, { useEffect, useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import fileSaver from "file-saver";
import Papa from "papaparse";

// Import Modal Component
import AddPolicyModal from "./AddPolicy";

const Dash = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [globalFilter, setGlobalFilter] = useState(""); // Search filter state
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/asset/get-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure 'Bearer' prefix
              "Content-Type": "application/json",
            },
          },
        );

        // Transform the data to flatten the structure
        const transformedData = response.data.map((item) => ({
          id: item.id, // Keep the id
          ...item.data, // Spread the fields inside the `data` object to the top level
        }));

        setData(transformedData); // Update state with transformed data
      } catch (error) {
        //window.location.href = "/login";
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new policy
  const handleAddPolicy = (newPolicy) => {
    setData((prev) => [...prev, { ...newPolicy, id: prev.length + 1 }]);
    setShowModal(false);
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
      { field: "policyNumber", headerName: "Policy Number", flex: 1 },
    ],
    [],
  );

  // Filter data based on global search
  const filteredData = useMemo(() => {
    const result =
      Array.isArray(data) && data.length
        ? data.filter((row) =>
            Object.values(row || {}).some(
              (value) =>
                value &&
                value
                  .toString()
                  .toLowerCase()
                  .includes(globalFilter.toLowerCase()),
            ),
          )
        : [];
    return result;
  }, [data, globalFilter]);

  return (
    <div className="container my-4">
      <h2 className="text-primary mb-3">Policy Dashboard</h2>
      <div className="mb-3">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-muted me-2"
        >
          Add Policy
        </button>
        <button onClick={handleExportCSV} className="btn btn-muted me-2">
          Export to CSV
        </button>
      </div>

      {/* Global Search */}
      <input
        type="text"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search all columns..."
        className="form-control mb-3"
      />

      {/* DataGrid */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData} // Use filtered data
          columns={columns} // Define columns
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.id} // Ensure the `id` field is used for uniqueness
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
