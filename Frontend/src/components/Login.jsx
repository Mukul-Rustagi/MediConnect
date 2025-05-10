import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router";

const Login = ({ onSwitchToSignup, onForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // Add your authentication logic here
    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Log in to your account</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
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
