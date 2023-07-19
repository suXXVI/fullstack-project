import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./src/reducers/appointmentSlice";

export default configureStore({
  reducer: {
    appointments: appointmentReducer,
  },
});
