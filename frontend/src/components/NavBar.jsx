import React from "react";
import wecarelogo from "../assets/wecarelogo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        <div>
          <img src={wecarelogo} alt="We Care logo" width="50" height="50" />
          We Care Insurance
        </div>
        <div className="d-flex align-items-center justify-content-start">
          <Link className="p-3">Client</Link>

          <Link className="p-3">Lenders</Link>

          <Link className="p-3">Users</Link>
        </div>
        <div className="d-flex align-items-center justify-content-end">
          <div className="dropdown">

            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
            <i className="bi bi-person-circle p-1"/>
              User Name
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link className="dropdown-item" to="/login">
                  Sign Out
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/">
                  View Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
