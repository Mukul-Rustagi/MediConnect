import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  status: "idle",
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: {
      reducer: (state, action) => {
        state.appointments.push(action.payload);
      },
      prepare: (appointment) => {
        return {
          payload: {
            ...appointment,
            id: Date.now(),
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const { addAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
