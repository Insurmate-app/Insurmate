const Home = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center bg-white">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center w-100 p-3 bg-light shadow-sm">
        <div className="logo d-flex align-items-center">
          <a
            href="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <div
              className="rounded-circle overflow-hidden bg-white d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                border: "2px solid #212529",
                padding: "2px",
              }}
            >
              <img
                src="/insurmate_logo.png"
                alt="Insurmate Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <h1 className="h5 text-dark mb-0 ms-2">Insurmate</h1>
          </a>
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

      {/* Main */}
      <main className="d-flex flex-column align-items-center flex-grow-1 w-100">
        {/* Hero Section */}
        <section id="hero" className="text-center my-5 px-3">
          <h3 className="display-4 fw-bold text-dark">
            Secure Your Mortgage Policy with Confidence
          </h3>
          <p className="lead text-secondary">
            Experience a revolutionary way to exchange mortgage policies with
            unparalleled security and transparency.
          </p>
          <a href="/about">
            <span className="btn btn-dark btn-lg mt-3 shadow-sm">
              Learn More
            </span>
          </a>
        </section>

        {/* Features Section */}
        <section id="features" className="text-center my-5 px-3">
          <h2 className="mb-4 text-dark">Why Choose Insurmate?</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">
                    Secure Communication
                  </h5>
                  <p className="card-text text-secondary">
                    Emails are insecure for exchanging insurance policies. Our
                    platform ensures confidentiality.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">
                    Blockchain Integration
                  </h5>
                  <p className="card-text text-secondary">
                    A private blockchain ensures secure policy exchanges via
                    peer-to-peer (P2P) networks.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">Transparency</h5>
                  <p className="card-text text-secondary">
                    Hyperledger Fabric enhances security and transparency
                    throughout the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-light w-100 py-3 mt-auto border-top">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Left Section: Copyright */}
          <small className="text-muted">
            &copy; {currentYear} Insurmate. All rights reserved.
          </small>

          <ul className="nav">
            <li className="nav-item">
              <a
                href="https://www.linkedin.com/showcase/insurmate-app"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-secondary d-flex align-items-center"
              >
                <i className="bi bi-linkedin me-1"></i>
                <small className="text-muted">LinkedIn</small>
              </a>
            </li>

            <li className="nav-item">
              <a
                href="https://github.com/We-Care-Insurance"
                target="_blank"
                className="nav-link text-secondary d-flex align-items-center"
              >
                <i className="bi bi-github me-1"></i>
                <small className="text-muted">Github</small>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Home;
