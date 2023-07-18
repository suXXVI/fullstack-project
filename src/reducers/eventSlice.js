import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://booking-system-api-suwanki.sigma-school-full-stack.repl.co";

// Thunk to get user's post
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId) => {
    const response = await fetch(`${BASE_URL}/events/username/${userId}`);
    return response.json();
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

// Create events slice
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle addNewEvent.fulfilled
    builder.addCase(addNewEvent.fulfilled, (state, action) => {
      state.events.push(action.payload);
    });
    // Handle addNewEvent.rejected
    builder.addCase(addNewEvent.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default eventsSlice.reducer;
