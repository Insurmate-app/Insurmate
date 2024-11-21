import React, { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import fileSaver from "file-saver";
import Papa from "papaparse";

// Use default import
import AddPolicyModal from "./AddPolicy";

const Dash = () => {
  const [data, setData] = useState([
    {
      id: 1,
      firstName: "Jon",
      lastName: "Snow",
      status: "Active",
      policyNumber: "P12345",
    },
    {
      id: 2,
      firstName: "Cersei",
      lastName: "Lannister",
      status: "Inactive",
      policyNumber: "P54321",
    },
  ]);

  const [globalFilter, setGlobalFilter] = useState(""); // Global search filter
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Add a new policy to the table
  const handleAddPolicy = (newPolicy) => {
    setData((prev) => [...prev, { ...newPolicy, id: prev.length + 1 }]); // Append with a unique ID
    setShowModal(false);
  };

  // Handle CSV export
  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredData); // Convert filtered data to CSV format
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Create a CSV Blob
    fileSaver.saveAs(blob, "policies.csv"); // Trigger the download
  };

  // Define table columns
  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "policyNumber", headerName: "Policy Number", flex: 1 },
  ];

  const filteredData = Array.isArray(data)
    ? data.filter((row) =>
        Object.values(row || {}).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(globalFilter.toLowerCase()),
        ),
      )
    : [];

  return (
    <div className="container my-4">
      <h2 className="text-primary mb-3">Policy Dashboard</h2>
      <div className="mb-3">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-success me-2"
        >
          Add Policy
        </button>
        {/* Export to CSV Button */}
        <button onClick={handleExportCSV} className="btn btn-secondary">
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

      {/* Table using DataGrid */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.id} // Ensure a unique key
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
