import { useState, useEffect } from "react";
import Modal from "./Modal"; 
import useSpinner from "../hooks/useSpinner";
import useModal from "../hooks/useModal";
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
  const [assetId, setAssetId] = useState(null);
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
    const fetchAssetId = async () => {
      try {
        const response = await api.get("asset/get-all");
        const id = response.data[0]?.id; // or however your backend returns it
        setAssetId(id);
      } catch (err) {
        console.error("Failed to fetch assetId:", err);
      }
    };
  
    fetchAssetId();
  }, []);  

  /**
   * @description Handles the form submission and file upload process
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   */
  const handleSubmit = async (e) => {
    const fileFormData = new FormData();
    e.preventDefault();
    activateSpinner();
    
    //Handles user not selecting a file before sending
    if (!selectedFile || selectedFile.size === 0){
      alert("Please select a file first.");
      return;
    }

    fileFormData.append("file", selectedFile);
    
    try{

      const response = await api.post(`/file/upload/${assetId}`, fileFormData);
      return response.data;

    } catch(error){

      alert("File upload failed. Check console for details.");
      console.error("Upload error:", error);
      throw error;

    }
    finally{

      deactivateSpinner();

    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h4 className="mb-3">
              Upload Insurance Document <i className="bi bi-filetype-pdf"></i>
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    multiple
                    accept=".pdf"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-primary">
                    {isSpinnerVisible && (
                      <span className="spinner-border spinner-border-sm text-dark mt-2"></span>
                    )}
                    <i className="bi bi-cloud-upload"></i> Upload Document
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-4">
              <h5>
                <i className="bi bi-info-circle-fill"></i> Add upload tips:
              </h5>
              <p>
                Acceptable Documents Include: Declaration Page, Coverage Summary
                Page, Certificate of Insurance. Details on the document include:
              </p>
              <ul>
                <li>Insured’s Name</li>
                <li>Insured’s Address</li>
                <li>Insurance Company Name</li>
                <li>Policy Number</li>
                <li>Effective and Expiration Dates</li>
                <li>Covered Vehicle with deductible</li>
                <li>Lender Name and Address</li>
              </ul>
            </div>
            <div className="text-center mt-4">
              <p>
                <i className="bi bi-info-circle-fill"></i> If you need
                assistance or would like to inquire about insurance options,
                please contact us at{" "}
                <a href="tel:4029572123" className="text-primary">
                  <i className="bi bi-telephone"></i> (402) 957-2123
                </a>
                .
              </p>
              <p className="mb-0">
                &copy; {new Date().getFullYear()} Copyright: We Care Insurance INC.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal isVisible={isVisible} message={message} hideModal={hideModal} />
    </div>
  );
};

export default UploadDocument;
