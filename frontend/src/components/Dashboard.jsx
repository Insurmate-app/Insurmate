import { useEffect, useMemo, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import fileSaver from "file-saver";
import Papa from "papaparse";

import { transformPolicyData } from "../utils/transformData";
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
        const transformedData = transformPolicyData(response.data);

        console.log("Transformed data:", transformedData);
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        window.location.href = "/login";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [api]);

  const handleAddPolicy = (newPolicy) => {
    console.log("New policy added:", newPolicy);
    setShowModal(false);
    setData((prevData) => [
      ...prevData,
      {
        id: newPolicy.id,
        ...newPolicy.data,
      },
    ]);
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
      {
        field: "firstName",
        headerName: "First Name",
        flex: 1,
        minWidth: 120,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "lastName",
        headerName: "Last Name",
        flex: 1,
        minWidth: 120,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 180,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "accountManager",
        headerName: "Account Manager",
        flex: 1.2,
        minWidth: 200,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 130,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          const status = params.row.status;
          const isVerified = params.row.isVerified;

          let badgeClass = "badge rounded-pill ";
          if (status === "Active") {
            badgeClass += "bg-success bg-opacity-50";
          } else if (status === "Pending") {
            badgeClass += "bg-warning bg-opacity-50";
          } else if (status === "Verified") {
            badgeClass += "bg-info bg-opacity-50";
          } else {
            badgeClass += "bg-secondary bg-opacity-50";
          }

          return (
            <div className="d-flex align-items-center justify-content-center w-100">
              <div
                className={badgeClass}
                style={{
                  padding: "6px 12px",
                  minWidth: "90px",
                  textAlign: "center",
                }}
              >
                <span>{params.row.status}</span>
                {(status === "Active" || status === "Verified") && (
                  <i
                    className={`bi ${isVerified ? "bi-shield-fill-check" : "bi-shield"} ms-2`}
                    style={{ verticalAlign: "middle" }}
                    title={isVerified ? "Verified" : "Not Verified"}
                  ></i>
                )}
              </div>
            </div>
          );
        },
      },
      {
        field: "policyNumber",
        headerName: "Policy Number",
        flex: 1,
        minWidth: 120,
        headerAlign: "center",
        align: "center",
      },
      // {
      //   field: "llmResponse.expirationDate",
      //   headerName: "Expiration Date",
      //   flex: 1,
      //   minWidth: 130,
      //   headerAlign: "center",
      //   align: "center",
      //   valueGetter: (params) => {
      //     return params.row.llmResponse?.expirationDate || 'N/A';
      //   }
      // },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1.2,
        minWidth: 160,
        sortable: false,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => {
          const isDeleting = deletingId === params.row.id;

          return (
            <div className="d-flex justify-content-center gap-2">
              <button
                className="btn btn-link text-info p-1"
                title="View"
                onClick={() => {
                  window.location.href = `/policy?id=${encodeURIComponent(params.row.id)}`;
                }}
                disabled={isDeleting}
              >
                <i className="bi bi-eye-fill"></i>
              </button>
              <button
                className="btn btn-link text-info p-1"
                title="Upload Document"
                onClick={() => {
                  window.location.href = `/upload?id=${encodeURIComponent(params.row.id)}`;
                }}
                disabled={isDeleting}
              >
                <i className="bi bi-cloud-arrow-up"></i>
              </button>
              <button
                className="btn btn-link text-info p-1"
                title="History"
                onClick={() => {
                  window.location.href = `/history?id=${encodeURIComponent(params.row.id)}`;
                }}
              >
                <i className="bi bi-clock-history"></i>
              </button>
              <button
                className="btn btn-link text-danger p-1"
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
            </div>
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
    <div className="container-fluid my-4">
      <h2 className="text-dark mb-3">Policy Dashboard</h2>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="d-flex gap-3 mb-2 mb-sm-0">
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
          className="form-control"
          style={{ borderRadius: "8px", maxWidth: "300px" }}
        />
      </div>
      <div style={{ height: "calc(100vh - 200px)", width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={isLoading}
          pagination
          sx={{
            width: "100%",
            "& .MuiDataGrid-root": {
              backgroundColor: "white",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "52px !important",
              lineHeight: "1.4",
              whiteSpace: "normal",
              overflow: "hidden",
              padding: "8px 4px",
              fontSize: "0.9rem",
              wordBreak: "break-word",
            },
            "& .MuiDataGrid-cellContent": {
              textAlign: "center",
              width: "100%",
            },
            "& .MuiDataGrid-row": {
              minHeight: "52px !important",
            },
            "@media (max-width: 768px)": {
              "& .MuiDataGrid-cell": {
                fontSize: "0.8rem",
                padding: "4px 2px",
                lineHeight: "1.2",
                minHeight: "40px !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                fontSize: "0.8rem",
                minHeight: "40px !important",
              },
              "& .MuiDataGrid-columnHeader": {
                padding: "0 2px",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                width: "100%",
                textAlign: "center",
                fontWeight: "600",
                overflow: "hidden",
                lineHeight: "1.2",
                whiteSpace: "normal",
                textOverflow: "ellipsis",
              },
              "@media (max-width: 768px)": {
                "& .MuiDataGrid-columnHeaders": {
                  fontSize: "0.8rem",
                  minHeight: "48px !important",
                  padding: "4px 0",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontSize: "0.8rem",
                  lineHeight: "1.1",
                },
                "& .MuiDataGrid-columnHeader": {
                  padding: "0 4px",
                },
              },
            },
          }}
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
