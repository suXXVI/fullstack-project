import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const nodemailAPI = "https://nodemailer.suwanki.repl.co";

export const sendEmail = createAsyncThunk(
  "sendEmail/email",
  async (appointmentData) => {
    console.log(appointmentData);
    try {
      const response = await axios.post(
        `${nodemailAPI}/send-email`,
        appointmentData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const BASE_URL =
  "https://booking-system-api-suwanki.sigma-school-full-stack.repl.co";

// for admin only
export const fetchAllAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async () => {
    const response = await fetch(`${BASE_URL}/appointments`);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

// Thunk to get user's post
export const fetchAppointmentsByUser = createAsyncThunk(
  "appointments/fetchByUser",
  async (userId) => {
    const response = await fetch(`${BASE_URL}/appointments/userid/${userId}`);
    const data = await response.json();
    // console.log(userId);
    // console.log(data);
    return data;
  }
);

// Thunk to add a new event
export const addNewAppointment = createAsyncThunk(
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
export const deleteAppointment = createAsyncThunk(
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
    isAdmin: false,
  },
  reducers: {
    setAdmin: (state) => {
      state.isAdmin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppointmentsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAppointmentsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllAppointments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addNewAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = [action.payload, ...state.appointments];
      })
      .addCase(addNewAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = state.appointments.filter(
          (appointment) => appointment.id !== action.payload
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = state.appointments.map((appointment) =>
          appointment.id === action.payload.id ? action.payload : appointment
        );
      })
      .addCase(editAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(RESET_APPOINTMENTS, (state) => {
        state.appointments = [];
        state.isLoading = false;
        state.isAdmin = false;
        state.error = null;
      });
  },
});

export default eventsSlice.reducer;
export const { setAdmin } = eventsSlice.actions;
export const resetAppointments = () => {
  return {
    type: RESET_APPOINTMENTS,
  };
};
