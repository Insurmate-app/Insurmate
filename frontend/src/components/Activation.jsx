import React, { useEffect, useState } from "react";

import { decodeBase64 } from "../functions/base64";
import { deobfuscate } from "../functions/obfs";
import { useApi } from "./useApi";

const ActivateAccount = () => {
  const [email, setEmail] = useState(""); // State for email
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [message, setMessage] = useState(""); // State for messages
  const [timer, setTimer] = useState(300); // Timer state in seconds (5 minutes)
  const [isOtpExpired, setIsOtpExpired] = useState(false); // OTP expiration state\

  const api = useApi();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromQuery = deobfuscate(decodeBase64(params.get("ep")));
    if (emailFromQuery) {
      setEmail(decodeURIComponent(emailFromQuery));
    } else {
      setMessage("No email provided. Please return to the reset page.");
    }
  }, []);

  useEffect(() => {
    if (!isOtpExpired && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setIsOtpExpired(true);
            setMessage("OTP has expired. Please request a new one.");
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isOtpExpired]);

  const generateOtp = async () => {
    if (!email) {
      setMessage("Email is missing. Cannot generate OTP.");
      return;
    }

    try {
      await api.post(`/user/regenerate-otp`, { email });
      setOtp(""); // Clear OTP input
      setTimer(300); // Reset timer to 5 minutes
      setIsOtpExpired(false);
      setMessage("A new OTP has been sent to your email.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to generate a new OTP. Please try again later.");
    }
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setMessage("Email is missing. Cannot activate account.");
      setIsLoading(false);
      return;
    }

    try {
      await api.post(`/user/verify`, { email, otpToken: otp });
      setMessage("Account activated successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Invalid OTP or email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white p-3">
      <div
        className="card p-4 shadow rounded w-100"
        style={{
          maxWidth: "450px",
          backgroundColor: "#f9f9f9",
          color: "#333",
          border: "1px solid #ddd",
        }}
      >
        <form onSubmit={handleActivate}>
          <h4 className="mb-3 text-center" style={{ color: "#333" }}>
            Activate Your Account
          </h4>

          {email && (
            <div className="mb-3">
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-bold">OTP</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              disabled={isOtpExpired}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <small className="text-muted">
              OTP is valid for: {formatTime(timer)}
            </small>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: isOtpExpired ? "#ccc" : "#333",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: isOtpExpired || isLoading ? "not-allowed" : "pointer",
            }}
            disabled={isLoading || isOtpExpired}
          >
            {isLoading ? "Activating..." : "Activate Account"}
          </button>

          <button
            type="button"
            className="btn btn-outline-dark w-100 mt-2"
            onClick={generateOtp}
            style={{
              borderRadius: "8px",
              borderColor: "#333",
              color: "#333",
              fontWeight: "bold",
              backgroundColor: "#f9f9f9",
            }}
          >
            Regenerate OTP
          </button>

          {message && (
            <div
              className="mt-3 alert text-center"
              style={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #ddd",
                color: "#555",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ActivateAccount;
