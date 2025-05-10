import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [
    {
      id: 1,
      providerId: 1,
      title: "Annual Physical Exam",
      date: "2023-12-20",
      time: "10:00 AM",
      status: "confirmed",
      type: "General Checkup",
      location: "Main Clinic, Room 302",
    },
    {
      id: 2,
      providerId: 3,
      title: "Dermatology Consultation",
      date: "2023-12-22",
      time: "2:30 PM",
      status: "pending",
      type: "Specialist Visit",
      location: "Specialty Center",
    },
  ],
  status: "idle",
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    prepare: (appointment) => {
      return {
        payload: {
          ...appointment,
          id: Date.now(), // Auto-generate ID
          createdAt: new Date().toISOString(),
        },
      };
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

export const { addAppointment, updateAppointmentStatus, cancelAppointment } =
  appointmentSlice.actions;

export const selectAppointments = (state) => state.appointments.appointments;

export const selectAppointmentsByStatus = (state, status) => {
  if (status === "all") return state.appointments.appointments;
  return state.appointments.appointments.filter((a) => a.status === status);
};

export const selectUpcomingAppointments = (state) =>
  state.appointments.appointments.filter((a) => a.status !== "completed");

export const selectPastAppointments = (state) =>
  state.appointments.appointments.filter((a) => a.status === "completed");

export default appointmentSlice.reducer;
