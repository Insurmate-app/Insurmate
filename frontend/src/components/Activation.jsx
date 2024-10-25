import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";

const base_url = import.meta.env.VITE_API_BASE_URL;
const activation_url = `${base_url}/user/verify`;
const regenerate_otp_url = `${base_url}/user/regenerate-otp`;

const ActivateAccount = () => {
  const { email } = useContext(UserContext);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  // Function to format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

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
    try {
      await axios.post(regenerate_otp_url, { email });
      setOtp("");
      setTimer(300); // Reset timer to 5 minutes
      setIsOtpExpired(false);
      setMessage("A new OTP has been sent to your email.");
    } catch (err) {
      setMessage("Failed to generate a new OTP. Please try again.");
    }
  };

  // Handle account activation with OTP
  const handleActivate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(activation_url, { email, otpToken: otp });
      setMessage("Account activated successfully.");
    } catch (err) {
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
