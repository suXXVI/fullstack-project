import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

//add to firebase database
export const saveAppointment = createAsyncThunk(
  'appointments/saveAppointment',
  async ({
    summary,
    location,
    description,
    startDateTime,
    endDateTime,
    attendees,
  }) => {
    try {
      const appointmentsRef = collection(db, 'events');
      const newAppointmentRef = doc(appointmentsRef);

      await setDoc(newAppointmentRef, {
        summary: summary,
        location: location,
        description: description,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        attendees: attendees,
      });

      const appointment = {
        id: newAppointmentRef.id,
        summary: summary,
        location: location,
        description: description,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        attendees: attendees,
      };

      console.log('success');
      return appointment;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//nodemailer
const nodemailAPI = 'https://nodemailer.suwanki.repl.co';

export const sendEmail = createAsyncThunk(
  'sendEmail/email',
  async (forNodeMailer) => {
    console.log(forNodeMailer);
    try {
      const response = await axios.post(
        `${nodemailAPI}/send-email`,
        forNodeMailer
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const BASE_URL =
  'https://booking-system-api-suwanki.sigma-school-full-stack.repl.co';

// for admin only
export const fetchAllAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async () => {
    const response = await fetch(`${BASE_URL}/appointments`);
    const data = await response.json();
    return data;
  }
);

// Thunk to get user's post
export const fetchAppointmentsByUser = createAsyncThunk(
  'appointments/fetchByUser',
  async (userId) => {
    const timestamp = Date.now(); // Get the current timestamp
    const response = await fetch(
      `${BASE_URL}/appointments/userid/${userId}?t=${timestamp}`
    );
    const data = await response.json();
    return data;
  }
);

// Thunk to add a new appointment to appointments table
export const addNewAppointment = createAsyncThunk(
  'appointments/addNewEvent',
  async (appointmentData) => {
    console.log(appointmentData);
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

// Thunk to fetch a specific appointment by ID
export const fetchAppointmentById = createAsyncThunk(
  'appointments/fetchById',
  async (appointmentId) => {
    const response = await fetch(`${BASE_URL}/appointments/${appointmentId}`);
    const data = await response.json();
    return data;
  }
);

// Thunk to delete an event
export const deleteAppointment = createAsyncThunk(
  'appointments/deleteEvent',
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
  'appointments/editEvent',
  async ({ appointmentId, appointmentData }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/appointments/${appointmentId}`,
        appointmentData
      );
      return response.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  }
);

const RESET_APPOINTMENTS = 'appointments/reset';

// Create events slice
const eventsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    isLoading: false,
    error: null,
    isAdmin: false,
    addtoCalendar: false,
    isCopied: false,
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
      .addCase(fetchAppointmentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointments = [action.payload]; // Store the fetched appointment in the state
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
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
      .addCase(saveAppointment.pending, (state) => {
        state.addtoCalendar = true;
      })
      .addCase(saveAppointment.fulfilled, (state) => {
        state.addtoCalendar = false;
      })
      .addCase(saveAppointment.rejected, (state, action) => {
        state.addtoCalendar = false;
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
