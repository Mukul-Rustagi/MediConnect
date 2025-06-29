import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const Login = ({ onSwitchToSignup, onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);

    const response = await axios.post(
      "http://localhost:5000/api/v1/login",
      formData
    );
    alert(response.data.message);
    if (response.data.message == "Login successful.") {
      console.log(response);
      console.log(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      if (formData.role == "Patient") {
        navigate("/dashboardPatient");
      } else {
        navigate("/dashboardDoctor");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Log in to your account</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="mail">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="Enter your role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>

            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Keep me logged in</label>
            </div>

            <button type="submit" className="auth-button">
              Log in
            </button>
          </form>

          <div className="auth-footer">
            <button className="auth-link" onClick={onForgotPassword}>
              Forgot your username or password?
            </button>
            <span className="auth-divider">|</span>
            <button className="auth-link" onClick={() => navigate("/signUp")}>
              Don't have an account? Sign up now.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
