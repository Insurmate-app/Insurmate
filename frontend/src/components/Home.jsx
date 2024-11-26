const Home = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center bg-white">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center w-100 p-3 bg-light shadow-sm">
        <div className="logo d-flex align-items-center">
          <img
            src="/insurmate_logo.png"
            alt="Insurmate Logo"
            className="me-2"
            style={{ height: "40px" }}
          />
          <h1 className="h5 text-dark mb-0">Insurmate</h1>
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-dark" href="/blockchain">
                Technology
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link text-dark" href="#team">
                Team
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link text-dark" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-dark"
                href="/contact"
              >
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
    </div>
  );
};

export default Home;
