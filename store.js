import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./src/reducers/eventSlice";

export default configureStore({
  reducer: {
    events: eventReducer,
  },
});
