import { configureStore } from "@reduxjs/toolkit";
import providerReducer from "./features/providers/providerSlice";
import appointmentReducer from "./features/appointments/appointmentSlice";
import scheduleReducer from "./features/schedule/scheduleSlice";
import uiReducer from "./features/UI/uiSlice";
export const store = configureStore({
  reducer: {
    providers: providerReducer,
    appointments: appointmentReducer,
    schedule: scheduleReducer,
    ui: uiReducer,
  },
});

export default store;
