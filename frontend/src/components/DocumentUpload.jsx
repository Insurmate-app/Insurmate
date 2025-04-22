import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ToastComponent from "../components/ToastComponent";
import useConfirmDialog from "../hooks/useConfirmDialog.jsx";
import useModal from "../hooks/useModal";
import useSpinner from "../hooks/useSpinner";
import Modal from "./Modal";
import { useApi } from "./useApi";

/**
 * @component UploadDocument
 * @description A component that handles insurance document upload functionality.
 * It manages file selection, upload process, and displays upload status.
 * The component includes validation for client ID and provides feedback through modals.
 *
 * @returns {JSX.Element} The rendered upload document interface
 */
const UploadDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { isSpinnerVisible, activateSpinner, deactivateSpinner } = useSpinner();
  const { isVisible, message, showModal, hideModal } = useModal();
  const [allFiles, setAllFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const [confirm, ConfirmDialog] = useConfirmDialog();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const api = useApi();

  /**
   * @description Handles file selection event
   * @param {React.ChangeEvent<HTMLInputElement>} e - The file input change event
   */
  const handleChange = (e) => {
    const file = e.target.files[0]; // Access the first file
    setSelectedFile(file);
  };

  useEffect(() => {
    if (!id) {
      window.location.href = "/dashboard";
      return;
    }
    const fetchFiles = async () => {
      try {
        const response = await api.get(`/file/list/${id}`);
        const files = response.data;

        const matchingFiles = files.filter(
          (file) => file.filename === `${id}.pdf`,
        );

        setAllFiles(files);
        setFilteredFiles(matchingFiles);
      } catch (error) {
        toast.error("Failed to fetch files. Please try again.");
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFiles();
  }, [id, needRefresh]);

  const handleView = async (id) => {
    try {
      activateSpinner();
      const response = await api.get(`/file/signed-url/${id}`);
      const signedUrl = response.data.url;
      setDocumentUrl(signedUrl);
      setShowDocumentModal(true);
    } catch (error) {
      console.error("Failed to generate signed URL:", error);
      toast.error("Failed to open file. Please try again.");
    } finally {
      deactivateSpinner();
    }
  };

  const closeDocumentModal = () => {
    setShowDocumentModal(false);
    setDocumentUrl(null);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = await confirm(
        "Are you sure you want to delete this file?",
      );

      if (!confirmDelete) {
        return;
      }
      setDeletingFileId(id);
      const response = await api.delete(`/file/delete/${id}`);
      if (response.status === 200) {
        setAllFiles([]);
        setFilteredFiles([]);
        toast.success("File deleted successfully!");
      }
    } catch (error) {
      console.error("Failed to delete file:", error);
      toast.error(error.response?.data?.message || "Failed to delete file");
    } finally {
      setDeletingFileId(null);
    }
  };

  const handleSubmit = async (e) => {
    const fileFormData = new FormData();
    e.preventDefault();
    activateSpinner();
    setUploadError(null);

    if (!selectedFile || selectedFile.size === 0) {
      toast.warning("Please select a file first.");
      return;
    }

    fileFormData.append("file", selectedFile);

    try {
      const response = await api.post(`/file/upload/${id}`, fileFormData);
      if (response.status === 200) {
        setSelectedFile(null);
        toast.success("File Upload successful!");
        setNeedRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("File upload failed:", error);
      setUploadError(error.response?.data?.message || "File upload failed");
    } finally {
      deactivateSpinner();
    }
  };

  return (
    <>
      <ToastComponent />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="mb-4">
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Client List
              </button>
            </div>
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-5">
                <h4 className="card-title mb-4">Insurance Document Upload</h4>

                <form onSubmit={handleSubmit} className="mb-5">
                  <div className="upload-container p-4 bg-light rounded-3 text-center">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="d-none"
                      accept=".pdf"
                      onChange={handleChange}
                    />
                    <label htmlFor="file" className="upload-label mb-3 d-block">
                      <i className="bi bi-cloud-upload fs-1 text-primary mb-3 d-block"></i>
                      <span className="d-block mb-2">
                        Choose a PDF file to upload
                      </span>
                      <span className="selected-file text-muted small">
                        {selectedFile ? selectedFile.name : "No file chosen"}
                      </span>
                    </label>
                    
                    {uploadError && (
                      <div className="alert alert-danger alert-dismissible fade show mt-3 mb-3" role="alert">
                        <strong>Error:</strong> {uploadError}
                        <button 
                          type="button" 
                          className="btn-close" 
                          onClick={() => setUploadError(null)}
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2"
                      disabled={!selectedFile}
                    >
                      {isSpinnerVisible ? (
                        <span className="spinner-border spinner-border-sm me-2"></span>
                      ) : (
                        <i className="bi bi-upload me-2"></i>
                      )}
                      Upload Document
                    </button>
                  </div>
                </form>

                {filteredFiles.length > 0 && (
                  <div className="uploaded-files mt-4">
                    <h5 className="mb-3">Uploaded Documents</h5>
                    <div className="list-group">
                      {filteredFiles.map((file, index) => (
                        <div
                          key={index}
                          className="list-group-item d-flex justify-content-between align-items-center p-3"
                        >
                          <div>
                            <i className="bi bi-file-pdf text-danger me-2"></i>
                            <span>{file.filename}</span>
                            <small className="text-muted d-block">
                              {new Date(file.uploadedAt).toLocaleString()}
                            </small>
                          </div>
                          <div>
                            <button
                              className="btn btn-link text-primary me-2"
                              onClick={() =>
                                handleView(file.filename.replace(".pdf", ""))
                              }
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-link text-danger"
                              onClick={() =>
                                handleDelete(file.filename.replace(".pdf", ""))
                              }
                              disabled={
                                deletingFileId ===
                                file.filename.replace(".pdf", "")
                              }
                            >
                              {deletingFileId ===
                              file.filename.replace(".pdf", "") ? (
                                <span
                                  className="spinner-border spinner-border-sm text-danger"
                                  role="status"
                                ></span>
                              ) : (
                                <i className="bi bi-trash"></i>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="guidelines mt-4">
                  <small className="text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    Accepted formats: PDF only. Max file size: 1MB
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {ConfirmDialog}

        {/* Error Modal */}
        <Modal isVisible={isVisible} message={message} hideModal={hideModal} />

        {/* Document Viewer Modal */}
        {showDocumentModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Document Viewer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeDocumentModal}
                  ></button>
                </div>
                <div className="modal-body p-0" style={{ height: "80vh" }}>
                  {documentUrl && (
                    <iframe
                      src={documentUrl}
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                      title="Document Viewer"
                    ></iframe>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeDocumentModal}
                  >
                    Close
                  </button>
                  <a
                    href={documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadDocument;
