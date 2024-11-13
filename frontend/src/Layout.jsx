import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
  const location = useLocation();

  // Define paths where NavBar should not be displayed
  const pathsWithoutNavBar = [
    "/",
    "/login",
    "/signup",
    "/reset-password",
    "/activate-account",
  ];

  return (
    <div>
      {/* Show NavBar only if the current path is not in pathsWithoutNavBar */}
      {!pathsWithoutNavBar.includes(location.pathname) && <NavBar />}

      <Outlet />
    </div>
  );
};

export default Layout;
