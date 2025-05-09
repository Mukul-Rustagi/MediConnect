import React from "react";
import "../styles/Cover.css";
import { useNavigate } from "react-router";
const HealthcareCover = () => {
  const navigate = useNavigate();
  return (
    <div className="healthcare-cover">
      <header className="header">
        <h1 className="logo">MediConnect</h1>
        <div className="auth-buttons">
          <button className="btn btn-login" onClick={() => navigate("login")}>
            Log In
          </button>
          <button className="btn btn-signup" onClick={() => navigate("signUp")}>
            Sign up
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="main-content-section">
          <section className="section-image">
            <img src="https://th.bing.com/th/id/OIP.M43am8fEkgGDct75ZKgVhQHaFi?rs=1&pid=ImgDetMain"></img>
          </section>
          <section className="hero-section">
            <h2 className="hero-title">Welcome to Healthcare</h2>
            <p className="hero-subtitle">
              Your health is our top priority. Manage your appointments and
              connect with your healthcare providers.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate("signUp")}
              >
                Create an account
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("login")}
              >
                Log In
              </button>
            </div>
          </section>
        </section>

        <section className="services-section">
          <h3 className="services-title">How can we help you today?</h3>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📅</div>
              <h4 className="service-name">Book an appointment</h4>
              <p className="service-description">
                Schedule a visit in person or by video
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">👨‍⚕️</div>
              <h4 className="service-name">Consult a doctor</h4>
              <p className="service-description">
                Get care when you need it, from wherever you are
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📋</div>
              <h4 className="service-name">Check your health records</h4>
              <p className="service-description">
                Access your health history and more
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HealthcareCover;
