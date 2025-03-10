import React, { useState, useEffect } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from "../src/firebase";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/signup.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const emailPattern = /^[a-z]+\.\d{6}@meycauayan\.sti\.edu\.ph$/;

  const passwordError = password.length > 0 && password.length < 8 ? "Password must be at least 8 characters" : "";
  const confirmPasswordError =
    confirmPassword.length > 0 && confirmPassword !== password ? "Passwords do not match" : "";


  useEffect(() => {
    if (email.length > 0) {
      if (!emailPattern.test(email)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }
  }, [email]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(""); 

    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setEmailError("There is already an existing account with this email.");
        return;
      }

      // Create user if email is not taken
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      navigate("/verify-email"); 
    } catch (err: any) {
      console.error("Signup Error:", err.message);
      setEmailError("Account already registered. ");
    }
  };

  return (
    <div className="d-flex container-fluid justify-content-center align-items-center flex-row w-100 pt-5" style={{ background: "none" }}>
      <div className="d-none d-md-flex ps-5 ms-5 flex-column justify-content-center align-items-center text-start p-0 m-0" 
        style={{
          width:"100%",
          height:"auto"

        }}
        
        >
          <img className=" FLOlogo bg-transparent d-block " src="../../src/assets/FLOLOGObg.png"
            style={{
              width:"100%",
              maxWidth:"282px",
              height:"auto",
      
            }}
          
          />
          <p className="w-50 align-self-end">Returning lost objects, one item <br/> at a time.</p>
        </div>
        <div className="d-flex justify-content-lg-start justify-content-center align-items-center ps-4"
            style={{
              width:"100%",
              height:"auto",
              borderLeft:"1px solid black"
      
            }}
          >
        <div className="p-3 justify-content-center align-items-center"
          style={{
            background:"transparent",
           width: "clamp(250px, 64%, 600px)",

          }}
        >
          <div className="text-start justify-content-start mb-4" 
            style={{
              height:"30%",
            }}
          >
            <h2 className="fw-bold w-75 ms-lg-4"
              style={{
                fontFamily:"League Spartan, serif",
                fontSize: "clamp(1.5rem, 2.1vw, 2.5rem)", 
                fontWeight:"600",
                color:"#454545"
              }}  
            >Sign-up</h2>
          </div>
          <div className="justify-content-center align-items-center">
            <form className="formsignup" onSubmit={handleSignup}>
                
              <div className="mb-4 pb-3 inputparent">
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : "is-valid" }`}
                  placeholder="School Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="text-danger small mt-2 ps-1 error" style={{ minHeight: "10px" }}>{emailError}</div>
              </div>

              <div className="mb-4 pb-3 pt-1 inputparent">
                <input
                  type="password"
                  className={`form-control ${passwordError ? "is-invalid" : "is-valid"}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-danger small mt-1 ps-1 error" style={{ minHeight: "10px" }}>{passwordError}</div>
              </div>

              <div className="mb-4 pt-1 inputparent">
                <input
                  type="password"
                  className={`form-control ${confirmPasswordError ? "is-invalid" : "is-valid"}`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div className="text-danger small mt-1 mb-3 ps-1 error" style={{ minHeight: "10px" }}>{confirmPasswordError}</div>
              </div>

              <div className="mb-3 d-flex align-items-center justify-content-center">
                <input
                  type="checkbox"
                  className="form-check-input fs-5 m-3 ms-0"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  required
                />
                <span className="small text-center pe-3"
                  style={{
                    fontSize: "clamp(10px, 1.2vw, 13px)", 
                    fontFamily:"Work Sans, sans-serif",

                  }}  
                >
                  I have read and agree to the{" "}<br/>
                  <span className="text-primary fw-bold">Terms & Conditions</span>
                </span>
              </div>
            <div className="w-100 text-center">
                <button type="submit" className="btn" disabled={!checked}
                  style={{
                    width:"150px",
                    minWidth:"100px",
                    borderRadius:"20px",
                    fontFamily:"Work Sans, sans-serif",
                    fontSize: "clamp(14px, 1.5vw, 16px)", 
                    color:"#fafcff",
                    backgroundColor:"#2169ac"
                  }}
                >
                  Signup
                </button>
              </div>
            </form>
          </div>

          <p className="text-center mt-2 pt-1 small"
            style={{
              fontFamily:"Work Sans, sans-serif",
              fontSize:"13px",
              opacity:"0.8",
              color:"black"
            }}
          >
            Already have an account? 
            <Link to="/login" className="text-primary fw-bold"
              style={{
                textDecoration:"none",
                color:"#004aad",
                fontWeight:"bold"
              }}
            > Login</Link>
          </p>
        </div>
        </div>
    </div>
  );
};

export default Signup;
