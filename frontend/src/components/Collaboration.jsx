import React, { useState } from "react";

const CollaborationComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = (pdfPath) => {
    window.location.href = pdfPath;
  };

  const pdfFiles = [
    { name: "Fall 2024 Poster", path: "/uno/fall_2024_poster.pdf" },
    { name: "Spring 2025 Poster", path: "/uno/spring_2025_poster.pdf" },
  ];

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center w-100 p-3 bg-light shadow-sm">
      <div className="logo d-flex align-items-center">
          <a href="/">
            <img
              src="/insurmate_logo.png"
              alt="Insurmate Logo"
              className="me-2"
              style={{ height: "40px" }}
            />
          </a>  
            <h1 className="h5 text-dark mb-0">Insurmate</h1>
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-dark" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/collaboration">
                Collaboration
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="/contact">
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </header>
    
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
                    <strong>Available Documents:</strong>
                  </p>
                  <div className="d-grid gap-2">
                    {pdfFiles.map((pdf, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigate(pdf.path)}
                        className="btn btn-outline-danger"
                      >
                        {pdf.name}
                      </button>
                    ))}
                  </div>
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
    </div>
  );
};

export default CollaborationComponent;
