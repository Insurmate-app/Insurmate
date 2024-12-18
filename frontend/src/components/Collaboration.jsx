import React, { useState } from "react";

const CollaborationComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = () => {
    window.location.href = "/uno/fall_2024_poster.pdf";
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-start">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header text-center bg-light">
              <img
                src={`/uno_logo.jpeg`}
                alt="University of Nebraska Omaha Logo"
                className="img-fluid"
                style={{ maxWidth: "120px" }}
              />
            </div>
            <div className="card-body">
              <h3 className="card-title text-center">
                Collaboration with University of Nebraska Omaha
              </h3>
              <p className="text-center">
                Click below to explore the collaboration details.
              </p>
              <div className="text-center">
                <button onClick={handleClick} className="btn btn-danger mb-3">
                  {isExpanded ? "Collapse Folder" : "Expand Folder"}
                </button>
              </div>

              {isExpanded && (
                <div className="border p-3 bg-white rounded shadow-sm">
                  <p>
                    <strong>Folder:</strong> Fall 24
                  </p>
                  <button onClick={handleNavigate} className="btn btn-danger">
                    Go to Fall 24 Collaboration
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h4 className="text-primary text-center">
              Acknowledgment of Collaboration
            </h4>
            <p className="text-center">
              We sincerely value and acknowledge the significant collaboration
              with the University of Nebraska Omaha. Your contributions are
              greatly appreciated and integral to our shared success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationComponent;
