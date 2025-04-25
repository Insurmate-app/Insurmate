import { useState } from "react";

import { deleteToken } from "../functions/tokenManager";
import LogoutSuccess from "./LogoutSuccess";
import { useApi } from "./useApi";

const Navbar = () => {
  const api = useApi();
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const handleLogout = async () => {
    try {
      await api.post(`/user/logout`).then((response) => {
        deleteToken();
        setLogoutSuccess(true);
        setTimeout(() => {
          setLogoutSuccess(false);
          // Navigate smoothly
          document.startViewTransition(() => {
            window.location.href = "/login";
          });
        }, 600);
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {logoutSuccess && <LogoutSuccess />}
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a href="/dashboard" className="navbar-brand d-flex align-items-center">
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
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <span className="ms-2">Insurmate</span>
        </a>
        <button
          className="btn btn-light"
          style={{
            backgroundColor: "#d98880",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
