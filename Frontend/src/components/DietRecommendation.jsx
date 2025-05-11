import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../styles/DietRecommendation.css";

const DietRecommendation = ({ onClose }) => {
  const [userData, setUserData] = useState({
    age: 30,
    gender: "female",
    height: 160,
    weight: 60,
    goal: "weight loss",
    activityLevel: "light",
    dietPreference: "vegan",
    medicalConditions: ["hypothyroidism"],
  });
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const fetchDietRecommendation = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to get diet recommendations.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/diets/recommendations",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data); // Debug log

      if (response.data.status === "success" && response.data.data) {
        setDietPlan(response.data.data);
      } else if (response.data.status === "error") {
        throw new Error(
          response.data.message || "Failed to generate diet plan"
        );
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to get diet recommendations. Please try again.";
      setError(errorMessage);
      console.error("Error fetching diet plan:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConditionChange = (e) => {
    const { value, checked } = e.target;
    setUserData((prev) => {
      const conditions = [...prev.medicalConditions];
      if (checked) {
        conditions.push(value);
      } else {
        const index = conditions.indexOf(value);
        if (index > -1) {
          conditions.splice(index, 1);
        }
      }
      return { ...prev, medicalConditions: conditions };
    });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h1>Personalized Diet Plan</h1>
        <div className="diet-recommendation-container">
          <div className="user-data-form">
            <h2>Your Profile</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={userData.height}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={userData.weight}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Goal</label>
                <select
                  name="goal"
                  value={userData.goal}
                  onChange={handleInputChange}
                >
                  <option value="weight loss">Weight Loss</option>
                  <option value="muscle gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="improve health">Improve Health</option>
                </select>
              </div>

              <div className="form-group">
                <label>Activity Level</label>
                <select
                  name="activityLevel"
                  value={userData.activityLevel}
                  onChange={handleInputChange}
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light Activity</option>
                  <option value="moderate">Moderate Activity</option>
                  <option value="active">Active</option>
                  <option value="very active">Very Active</option>
                </select>
              </div>

              <div className="form-group">
                <label>Diet Preference</label>
                <select
                  name="dietPreference"
                  value={userData.dietPreference}
                  onChange={handleInputChange}
                >
                  <option value="vegan">Vegan</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>
            </div>

            <div className="medical-conditions">
              <h3>Medical Conditions</h3>
              <div className="condition-options">
                {[
                  "hypothyroidism",
                  "diabetes",
                  "hypertension",
                  "celiac",
                  "lactose intolerance",
                ].map((condition) => (
                  <label key={condition}>
                    <input
                      type="checkbox"
                      value={condition}
                      checked={userData.medicalConditions.includes(condition)}
                      onChange={handleConditionChange}
                    />
                    {condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <button
              className="generate-btn"
              onClick={fetchDietRecommendation}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Diet Plan"}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {dietPlan && (
            <div className="diet-plan">
              <h2>Your Personalized Diet Plan</h2>

              <div className="plan-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("breakfast")}
                >
                  <h3>Breakfast</h3>
                  <span>{expandedSection === "breakfast" ? "−" : "+"}</span>
                </div>
                {expandedSection === "breakfast" && (
                  <div className="section-content">
                    <p>{dietPlan.data.breakfast}</p>
                  </div>
                )}
              </div>

              <div className="plan-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("lunch")}
                >
                  <h3>Lunch</h3>
                  <span>{expandedSection === "lunch" ? "−" : "+"}</span>
                </div>
                {expandedSection === "lunch" && (
                  <div className="section-content">
                    <p>{dietPlan.data.lunch}</p>
                  </div>
                )}
              </div>

              <div className="plan-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("dinner")}
                >
                  <h3>Dinner</h3>
                  <span>{expandedSection === "dinner" ? "−" : "+"}</span>
                </div>
                {expandedSection === "dinner" && (
                  <div className="section-content">
                    <p>{dietPlan.data.dinner}</p>
                  </div>
                )}
              </div>

              <div className="plan-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("snacks")}
                >
                  <h3>Snacks</h3>
                  <span>{expandedSection === "snacks" ? "−" : "+"}</span>
                </div>
                {expandedSection === "snacks" && (
                  <div className="section-content">
                    <ul>
                      {Array.isArray(dietPlan.snacks) ? (
                        dietPlan.snacks.map((snack, index) => (
                          <li key={index}>{snack}</li>
                        ))
                      ) : (
                        <li>{dietPlan.data.snacks}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="plan-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("water")}
                >
                  <h3>Water Intake</h3>
                  <span>{expandedSection === "water" ? "−" : "+"}</span>
                </div>
                {expandedSection === "water" && (
                  <div className="section-content">
                    <p>{dietPlan.data.waterIntake}</p>
                  </div>
                )}
              </div>

              <div className="plan-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection("tips")}
                >
                  <h3>General Tips</h3>
                  <span>{expandedSection === "tips" ? "−" : "+"}</span>
                </div>
                {expandedSection === "tips" && (
                  <div className="section-content">
                    <ul>
                      {Array.isArray(dietPlan.generalTips) ? (
                        dietPlan.generalTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))
                      ) : (
                        <li>{dietPlan.data.generalTips}</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietRecommendation;