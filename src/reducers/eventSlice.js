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

// Create events slice
const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEventsByUser.fulfilled, (state, action) => {
      state.events = action.payload;
    });
    builder.addCase(addNewEvent.fulfilled, (state, action) => {
      // state.events = [action.payload, ...state.events];
      state.events = [...state.events, action.payload];
    });
  },
});

export default eventsSlice.reducer;
