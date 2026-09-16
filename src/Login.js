import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import kababjees from "./images/kababjees.jpg";
import kababjee from "./images/kababjee.png";
import Swal from "sweetalert2";

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "" && password === "") {
      navigate("/Navbar");
    } else {
      Swal.fire("Failed!", "Incorrect username and password.", "error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        {/* Left Image */}
        <div className="login-image-section">
          <img
            src={kababjees}
            alt="Kababjees"
            className="login-main-image"
          />
        </div>

        {/* Right Login */}
        <div className="login-card-section">
          <div className="card login-card">

            <div className="card-body text-center">

              <div className="logo-container">
                <img
                  src={kababjee}
                  alt="Kababjees Logo"
                  className="login-logo"
                />
              </div>

              <h2 className="fw-bold text-uppercase login-title">
                Login
              </h2>

              <p className="login-subtitle">
                Please enter your login and password!
              </p>

              {/* Username */}
              <div className="form-group">
                <label className="form-label">UserName</label>

                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>

              {/* Forgot Password */}
              <div className="forgot-password">
                <a href="#!">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                className="login-btn"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>

              {/* Sign Up */}
              <div className="signup-text">
                <p>
                  Don't have an account?{" "}
                  <a href="#!" className="fw-bold">
                    Sign Up
                  </a>
                </p>
              </div>

              {/* Social Icons */}
              <div className="social-row">
                <a href="#!" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a href="#!" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>

                <a href="#!" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>

                <a href="#!" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}