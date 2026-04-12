import React from "react";
import "../styles/Cover.css";
import { useNavigate } from "react-router";

const HealthcareCover = () => {
  const navigate = useNavigate();

  return (
    <div className="healthcare-cover">
      {/* Ambient animation layer */}
      <div className="cover-decor" aria-hidden="true">
        <div className="cover-decor-orb cover-decor-orb--1" />
        <div className="cover-decor-orb cover-decor-orb--2" />
        <svg
          className="cover-ecg"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path d="M0,30 L80,30 L100,10 L120,50 L140,30 L200,30 L220,28 L240,32 L260,30 L1200,30" />
        </svg>
        <span className="cover-float-icon">🩺</span>
        <span className="cover-float-icon">💊</span>
        <span className="cover-float-icon">❤️</span>
        <span className="cover-cross cover-cross--a" />
        <span className="cover-cross cover-cross--b" />
        <span className="cover-cross cover-cross--c" />
      </div>

      <header className="header">
        <h1 className="logo">MediConnect</h1>
        <div className="auth-buttons">
          <button
            className="btn btn-login"
            type="button"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
          <button
            className="btn btn-signup"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="main-content-section">
          <section className="hero-section">
            <div className="hero-badge">
              <span>🏥</span> Trusted hospital network
            </div>
            <h2 className="hero-title">
              Care that feels{" "}
              <span className="highlight">close to home</span>
            </h2>
            <p className="hero-subtitle">
              Book appointments, meet doctors by video, and keep your health
              records organized — a calm, modern experience built for patients
              and families.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Create free account
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Sign in →
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">50K+</span>
                <span className="stat-label">Patients cared for</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">1,200+</span>
                <span className="stat-label">Verified doctors</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4.9 ★</span>
                <span className="stat-label">Average rating</span>
              </div>
            </div>
          </section>

          <div className="hero-visual">
            <div className="hero-visual-ring" aria-hidden />
            <div className="hero-visual-ring hero-visual-ring--2" aria-hidden />
            <section className="section-image">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80"
                alt="Healthcare professional with patient in a bright clinic"
              />
            </section>
            <div className="hero-visual-badge">
              <div className="hero-visual-badge-icon" aria-hidden>
                +
              </div>
              <div>
                <div className="hero-visual-badge-title">Same-day visits</div>
                <div className="hero-visual-badge-sub">
                  Emergency &amp; specialty care coordination
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="cover-trust-strip">
          <div className="cover-trust-item">
            <span>🔒</span> HIPAA-minded security
          </div>
          <div className="cover-trust-item">
            <span>✓</span> Board-certified physicians
          </div>
          <div className="cover-trust-item">
            <span>📞</span> 24/7 nurse line
          </div>
        </div>

        <section className="services-section">
          <div className="services-header">
            <h3 className="services-title">How can we help you today?</h3>
            <p className="services-subtitle">
              Everything you need for connected, modern care
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-wrap">📅</div>
              <h4 className="service-name">Book an appointment</h4>
              <p className="service-description">
                Schedule in-person or video visits with verified specialists —
                often same week.
              </p>
              <div className="service-arrow">Get started →</div>
            </div>

            <div className="service-card">
              <div className="service-icon-wrap">👨‍⚕️</div>
              <h4 className="service-name">Talk to a doctor</h4>
              <p className="service-description">
                Get medical guidance from home with secure messaging and video.
              </p>
              <div className="service-arrow">Connect now →</div>
            </div>

            <div className="service-card">
              <div className="service-icon-wrap">📋</div>
              <h4 className="service-name">Health records</h4>
              <p className="service-description">
                Prescriptions, labs, and visit notes — organized in one place.
              </p>
              <div className="service-arrow">View records →</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HealthcareCover;
