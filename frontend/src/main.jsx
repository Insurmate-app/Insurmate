import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { UserProvider } from "./context/UserContext"; // Import UserProvider

import LoginForm from "./components/LoginForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import ActivateAccount from "./components/Activation.jsx";
import Layout from "./Layout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} /> {/* Home route without Layout */}
      <Route element={<Layout />}>
        {" "}
        {/* Layout applied to all nested routes */}
        <Route path="login" element={<LoginForm />} />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="reset-password" element={<PasswordReset />} />
        <Route path="activate-account" element={<ActivateAccount />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
