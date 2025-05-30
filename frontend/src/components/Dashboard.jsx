import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { DataGrid } from "@mui/x-data-grid";
import fileSaver from "file-saver";
import Papa from "papaparse";

import useConfirmDialog from "../hooks/useConfirmDialog";
import { transformPolicyData } from "../utils/transformData";
import AddPolicyModal from "./AddPolicy";
import ClientError from "./ClientError";
import NavBar from "./NavBar";
import RubikSpinner from "./RubikSpinner";
import SuccessAlert from "./SuccessAlert";
import ToastComponent from "./ToastComponent";
import { useApi } from "./useApi";

const Dash = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirm, ConfirmDialog] = useConfirmDialog();

  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/asset/get-all`);
        const transformedData = transformPolicyData(response.data);
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddPolicy = (newPolicy) => {
    setShowModal(false);
    setData((prevData) => [
      ...prevData,
      {
        id: newPolicy.id,
        ...newPolicy.data,
      },
    ]);
    setSuccessMessage("Policy added successfully!");
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    fileSaver.saveAs(blob, "policies.csv");
  };

  const handleDelete = async (id) => {
    const confirmDelete = await confirm(
      "Are you sure you want to delete this policy?",
    );
    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      // First, get the asset details to check if it has files
      let hasFiles = false;
      try {
        const assetResponse = await api.get(`/file/list/${id}`);
        hasFiles = assetResponse.data && assetResponse.data.length > 0;
      } catch (error) {
        console.error("Error checking for files:", error);
        // Continue with deletion even if file check fails
      }

      // If the asset had files, try to delete them
      if (hasFiles) {
        try {
          await api.delete(`/file/delete/${id}`);
        } catch (fileError) {
          console.error("Error deleting files:", fileError);
          // Continue with success message even if file deletion fails
        }
      }

      // Delete the asset
      await api.delete(`/asset/delete/${id}`);

      // Update UI
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setSuccessMessage("Policy deleted successfully.");

      // Auto dismiss after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting policy:", error);
      toast.error("Failed to delete policy. Please try again.");
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
          } else if (status === "Invalid") {
            badgeClass += "bg-danger bg-opacity-50";
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
                {(status === "Active" ||
                  status === "Verified" ||
                  status === "Invalid") && (
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

  return (
    <>
      {error && <ClientError message={error} />}
      <NavBar />
      <div className="container-fluid my-4">
        {isLoading && <RubikSpinner />}
        <ToastComponent />
        {successMessage && (
          <SuccessAlert
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}
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
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            disableSelectionOnClick
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
        {ConfirmDialog}
        <AddPolicyModal
          showModal={showModal}
          setShowModal={setShowModal}
          onAddPolicy={handleAddPolicy}
        />
      </div>
    </>
  );
};

export default Dash;
