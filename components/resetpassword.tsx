import React, { useState, useEffect } from "react";
import { auth, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from "../src/firebase";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // State for both email submission & password reset
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [oobCode, setOobCode] = useState<string | null>(null);

  // Step 1: Check if the component is handling email input or password reset
  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setLoading(true);
      verifyPasswordResetCode(auth, code)
        .then(() => {
          setOobCode(code);
        })
        .catch(() => {
          setError("Invalid or expired reset link.");
        })
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  // Step 2: Handle sending reset email
  const handleSendResetEmail = async () => {
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Check your email for a reset link.");
    } catch (err: any) {
      console.error("Error sending reset email:", err);
      setError(err.message || "Failed to send reset email.");
    }
    setLoading(false);
  };

  // Step 3: Handle password reset
  const handlePasswordReset = async () => {
    if (!oobCode) {
      setError("Invalid reset attempt.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess("Password reset successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="d-flex container-fluid justify-content-center align-items-center" style={{ height: "100vh", background: "#f8f9fa" }}>
      <div className="p-4 rounded shadow bg-white" style={{ width: "350px" }}>
        {loading && <div className="alert alert-info text-center">Processing...</div>}
        {!loading && error && <div className="alert alert-danger text-center">{error}</div>}
        {!loading && success && <div className="alert alert-success text-center">{success}</div>}

        {oobCode ? (
          // Password Reset Form
          <>
            <h2 className="fw-bold mb-4 text-center">Reset Password</h2>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary w-100 fw-bold" onClick={handlePasswordReset} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          // Email Input for Reset Link
          <>
            <h2 className="fw-bold mb-4 text-center">Forgot Password</h2>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn-primary w-100 fw-bold" onClick={handleSendResetEmail} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button className="btn btn-link w-100 mt-3" onClick={() => navigate("/login")}>
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
