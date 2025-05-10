import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  providers: [
    {
      id: 1,
      name: "Dr. Jane Smith",
      specialty: "Internal Medicine",
      type: "Primary Care",
      image:
        "https://www.shutterstock.com/image-photo/medical-science-laboratory-portrait-shot-260nw-1922200196.jpg",
      available: true,
      fee: 100,
    },
    {
      id: 2,
      name: "Dr. John Doe",
      specialty: "Internal Medicine",
      type: "Primary Care",
      image:
        "https://www.shutterstock.com/image-photo/medical-science-laboratory-portrait-shot-260nw-1922200196.jpg",
      available: true,
      fee: 120,
    },
    {
      id: 3,
      name: "Dr. Sarah Williams",
      specialty: "Dermatology",
      type: "Specialist",
      image:
        "https://www.shutterstock.com/image-photo/medical-science-laboratory-portrait-shot-260nw-1922200196.jpg",
      available: true,
      fee: 150,
    },
    {
      id: 4,
      name: "Dr. Michael Johnson",
      specialty: "Neurology",
      type: "Specialist",
      image:
        "https://www.shutterstock.com/image-photo/medical-science-laboratory-portrait-shot-260nw-1922200196.jpg",
      available: false,
      fee: 200,
    },
  ],
  specialties: [
    // Changed from selectedSpecialty to specialties
    "All Specialties",
    "Primary Care",
    "Mental Health",
    "Dermatology",
    "Women's Health",
    "Pregnancy & Postpartum",
  ],
  selectedSpecialty: "All Specialties", // Added this new field
  searchTerm: "",
  status: "idle",
  error: null,
};

const providerSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    setSelectedSpecialty: (state, action) => {
      state.selectedSpecialty = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSelectedSpecialty, setSearchTerm } = providerSlice.actions;

// Selectors
export const selectProvidersState = (state) => state.providers;

export const selectSelectedSpecialty = createSelector(
  [selectProvidersState],
  (providersState) => providersState.selectedSpecialty
);

export const selectSpecialties = createSelector(
  [selectProvidersState],
  (providersState) => providersState.specialties
);

export const selectFilteredProviders = createSelector(
  [selectProvidersState],
  (providersState) => {
    const { providers, selectedSpecialty, searchTerm } = providersState;

    return providers.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty =
        selectedSpecialty === "All Specialties" ||
        provider.type === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }
);

export const selectPrimaryCareProviders = createSelector(
  [selectFilteredProviders],
  (filteredProviders) =>
    filteredProviders.filter((p) => p.type === "Primary Care")
);

export const selectSpecialists = createSelector(
  [selectFilteredProviders],
  (filteredProviders) =>
    filteredProviders.filter((p) => p.type === "Specialist")
);

export const selectProviderById = (state, providerId) =>
  state.providers.providers.find((p) => p.id === providerId);

export default providerSlice.reducer;
