import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  selectedProvider: null,
  selectedDateTime: null,
  paymentMethod: null,
  availableDates: [
    "2025-05-15", // Changed to YYYY-MM-DD format
    "2025-05-16",
    "2025-05-17",
    "2025-05-20",
    "2025-05-22",
  ],
  availableTimes: [
    "09:00", // Changed to 24-hour format for consistency
    "09:30",
    "10:00",
    "10:30",
    "13:00",
    "13:30",
    "14:00",
    "15:30",
  ],
  status: "idle",
  error: null,
};
const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    selectProvider: (state, action) => {
      state.selectedProvider = action.payload;
      state.step = 2;
    },
    selectDateTime: (state, action) => {
      state.selectedDateTime = action.payload;
      state.step = 3;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      state.step = 4;
    },
    resetSchedule: (state) => {
      state.step = 1;
      state.selectedProvider = null;
      state.selectedDateTime = null;
      state.paymentMethod = null;
    },
  },
});

export const {
  setStep,
  selectProvider,
  selectDateTime,
  setPaymentMethod,
  resetSchedule,
} = scheduleSlice.actions;

export const selectCurrentStep = (state) => state.schedule.step;
export const selectSelectedProvider = (state) =>
  state.schedule.selectedProvider;
export const selectSelectedDateTime = (state) =>
  state.schedule.selectedDateTime;
export const selectPaymentMethod = (state) => state.schedule.paymentMethod;
export const selectAvailableDates = (state) => state.schedule.availableDates;
export const selectAvailableTimes = (state) => state.schedule.availableTimes;

export const selectIsDateAvailable = (state, date) => {
  const dateString = formatDate(date);
  return state.schedule.availableDates.includes(dateString);
};

export default scheduleSlice.reducer;
