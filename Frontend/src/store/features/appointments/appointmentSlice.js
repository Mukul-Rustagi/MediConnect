import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      console.log(action.payload);
      state.appointments.push(action.payload); // Changed to push to allow multiple appointments
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.appointments.find((a) => a.id === id);
      if (appointment) {
        appointment.status = status;
      }
    },
    cancelAppointment: (state, action) => {
      const id = action.payload;
      state.appointments = state.appointments.filter((a) => a.id !== id);
    },
  },
});

// ✅ Make sure you export the actions and reducer
export const { addAppointment, updateAppointmentStatus, cancelAppointment } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
