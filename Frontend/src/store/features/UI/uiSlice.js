// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileOpen: (state) => {
      console.log(state.mobileOpen);
      state.mobileOpen = !state.mobileOpen;
    },
    setMobileOpen: (state, action) => {
      state.mobileOpen = action.payload;
    },
  },
});

export const { toggleMobileOpen, setMobileOpen } = uiSlice.actions;

export default uiSlice.reducer;
