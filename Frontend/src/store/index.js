import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./features/providers/providerSlice";
import appointmentReducer from "./features/appointments/appointmentSlice";
import scheduleReducer from "./features/schedule/scheduleSlice";
export const store = configureStore({
  reducer: {
    providers: providerReducer,
    appointments: appointmentReducer,
    schedule: scheduleReducer,
  },
});

export default store;
