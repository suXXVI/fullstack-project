import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://booking-system-api-suwanki.sigma-school-full-stack.repl.co";

// Thunk to get user's post
export const fetchEventsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId) => {
    const response = await fetch(`${BASE_URL}/events/username/${userId}`);
    const data = await response.json();
    console.log(userId);
    console.log(data);
    return data;
  }
);

// Thunk to add a new event
export const addNewEvent = createAsyncThunk(
  "events/addNewEvent",
  async (eventData) => {
    try {
      const response = await axios.post(`${BASE_URL}/events`, eventData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Thunk to delete an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    try {
      await axios.delete(`${BASE_URL}/events/${eventId}`);
      return eventId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//Thunk to edit an event
export const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ eventId, eventData }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/events/${eventId}`,
        eventData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const RESET_EVENTS = "events/reset";

// Create events slice
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
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
      state.events = action.payload;
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
      state.events = [action.payload, ...state.events];
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
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(editEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    });
    builder.addCase(editEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(RESET_EVENTS, (state) => {
      state.events = [];
      state.isLoading = false;
      state.error = null;
    });
  },
});

export default eventsSlice.reducer;
export const resetEvents = () => {
  return {
    type: RESET_EVENTS,
  };
};
