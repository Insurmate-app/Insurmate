import React, { useEffect, useState } from "react";

import axios from "axios";

const ActivateAccount = () => {
  const [email, setEmail] = useState(""); // Added missing email state
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Function to format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Extract email from the query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromQuery = params.get("email");
    if (emailFromQuery) {
      setEmail(decodeURIComponent(emailFromQuery));
    } else {
      setMessage("No email provided. Please return to the reset page.");
    }
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    if (timer > 0 && !isOtpExpired) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsOtpExpired(true);
      setMessage("OTP has expired. Please request a new one.");
    }
  }, [timer, isOtpExpired]);

  // Function to generate or regenerate OTP
  const generateOtp = async () => {
    if (!email) {
      setMessage("Email is missing. Cannot generate OTP.");
      return;
    }

    try {
      await axios.post(`${baseUrl}/user/regenerate-otp`, { email });
      setOtp(""); // Clear OTP input
      setTimer(300); // Reset timer to 5 minutes
      setIsOtpExpired(false);
      setMessage("A new OTP has been sent to your email.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to generate a new OTP. Please try again later.");
    }
  };

  // Handle account activation with OTP
  const handleActivate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      setMessage("Email is missing. Cannot activate account.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${baseUrl}/user/verify`, { email, otpToken: otp });
      setMessage("Account activated successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Invalid OTP or email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div
        className="card p-4 shadow-sm rounded-3 w-100"
        style={{ maxWidth: "450px" }}
      >
        <form onSubmit={handleActivate}>
          <h4 className="mb-3 text-center">Activate Your Account</h4>

          {email && (
            <div className="mb-3">
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              disabled={isOtpExpired}
            />
            <small className="text-muted">
              OTP is valid for: {formatTime(timer)}
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading || isOtpExpired}
          >
            {isLoading ? "Activating..." : "Activate Account"}
          </button>

          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={generateOtp}
            disabled={isOtpExpired}
          >
            Regenerate OTP
          </button>

          {message && <div className="mt-3 alert alert-info">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default ActivateAccount;
