import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPrimaryCareProviders,
  selectSpecialists,
  selectSelectedSpecialty,
  selectSpecialties,
  setSelectedSpecialty,
  setSearchTerm,
} from "../store/features/providers/providerSlice";
import { selectProvider } from "../store/features/schedule/scheduleSlice";

const ProviderSelection = ({ onBack }) => {
  const dispatch = useDispatch(); // Get dispatch function once at the top

  // Get data from Redux store
  const primaryCareProviders = useSelector(selectPrimaryCareProviders);
  const specialists = useSelector(selectSpecialists);
  const selectedSpecialty = useSelector(selectSelectedSpecialty);
  const specialties = useSelector(selectSpecialties);

  // Local state for search term
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setLocalSearchTerm(term);
    dispatch(setSearchTerm(term)); // Use the dispatch function
  };

  const handleSpecialtyChange = (specialty) => {
    dispatch(setSelectedSpecialty(specialty)); // Use the dispatch function
  };

  const handleProviderSelect = (provider) => {
    dispatch(
      selectProvider({
        ...provider,
        image: provider.image || "https://placehold.co/80", // Use reliable placeholder
      })
    );
  };

  return (
    <div className="provider-selection">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search doctors"
          value={localSearchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="specialty-tabs">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            className={`specialty-tab ${
              selectedSpecialty === specialty ? "active" : ""
            }`}
            onClick={() => handleSpecialtyChange(specialty)}
          >
            {specialty}
          </button>
        ))}
      </div>

      <div className="providers-list">
        <h2>Primary Care Providers</h2>
        {primaryCareProviders.map((provider) => (
          <div
            key={provider.id}
            className={`provider-card ${
              !provider.available ? "unavailable" : ""
            }`}
            onClick={() => provider.available && handleProviderSelect(provider)}
          >
            <img
              src={provider.image || "https://placehold.co/80"}
              alt={provider.name}
              onError={(e) => {
                e.target.src = "https://placehold.co/80";
              }}
            />
            <div className="provider-info">
              <h3>{provider.name}</h3>
              <p>{provider.specialty}</p>
              {!provider.available && (
                <span className="availability">Not accepting new patients</span>
              )}
            </div>
          </div>
        ))}

        <h2>Specialists</h2>
        {specialists.map((provider) => (
          <div
            key={provider.id}
            className={`provider-card ${
              !provider.available ? "unavailable" : ""
            }`}
            onClick={() => provider.available && handleProviderSelect(provider)}
          >
            <img
              src={provider.image || "https://placehold.co/80"}
              alt={provider.name}
              onError={(e) => {
                e.target.src = "https://placehold.co/80";
              }}
            />
            <div className="provider-info">
              <h3>{provider.name}</h3>
              <p>{provider.specialty}</p>
              {!provider.available && (
                <span className="availability">Not accepting new patients</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button className="btn secondary" onClick={onBack}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProviderSelection;
