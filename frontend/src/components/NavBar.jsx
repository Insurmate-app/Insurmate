import React from "react";

import axios from "axios";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage");
        return;
      }

      console.log("Sending logout request...");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
        {}, // Empty body if required
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      // Clear storage
      localStorage.removeItem("token");

      // Redirect
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/insurmate_logo.png"
            alt="Logo"
            style={{ height: "30px", marginRight: "10px" }}
          />
          Insurmate
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
