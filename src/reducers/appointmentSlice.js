import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://booking-system-api-suwanki.sigma-school-full-stack.repl.co";

// Thunk to get user's post
export const fetchEventsByUser = createAsyncThunk(
  "appointments/fetchByUser",
  async (userId) => {
    const response = await fetch(`${BASE_URL}/appointments/username/${userId}`);
    const data = await response.json();
    console.log(userId);
    console.log(data);
    return data;
  }
);

// Thunk to add a new event
export const addNewEvent = createAsyncThunk(
  "appointments/addNewEvent",
  async (appointmentData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/appointments`,
        appointmentData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Thunk to delete an event
export const deleteEvent = createAsyncThunk(
  "appointments/deleteEvent",
  async (appointmentId) => {
    try {
      await axios.delete(`${BASE_URL}/appointments/${appointmentId}`);
      return appointmentId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//Thunk to edit an event
export const editAppointment = createAsyncThunk(
  "appointments/editEvent",
  async ({ appointmentId, appointmentData }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/appointments/${appointmentId}`,
        appointmentData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const RESET_APPOINTMENTS = "appointments/reset";

// Create events slice
const eventsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventsByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEventsByUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = action.payload;
    });
    builder.addCase(fetchEventsByUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addNewEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = [action.payload, ...state.appointments];
    });
    builder.addCase(addNewEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(editAppointment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editAppointment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.appointments = state.appointments.map((appointment) =>
        appointment.id === action.payload.id ? action.payload : appointment
      );
    });
    builder.addCase(editAppointment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(RESET_APPOINTMENTS, (state) => {
      state.appointments = [];
      state.isLoading = false;
      state.error = null;
    });
  },
});

export default eventsSlice.reducer;
export const resetAppointments = () => {
  return {
    type: RESET_APPOINTMENTS,
  };
};
