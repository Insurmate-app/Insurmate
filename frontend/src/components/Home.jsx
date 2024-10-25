import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column align-items-center bg-light">
      <header className="d-flex justify-content-between align-items-center w-100 p-3">
        <div className="logo">
          <h1 className="h5">Insurmate</h1>
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Team
              </a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link btn btn-outline-primary" href="#">
                Contact us
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <h2 className="display-5 text-center mb-5">Something about product</h2>
      </main>
    </div>
  );
}

export default Home;
