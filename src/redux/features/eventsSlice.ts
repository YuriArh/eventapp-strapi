import { createSlice } from "@reduxjs/toolkit";
import { eventsState } from "../../interfaces/Events";
import { getEvents } from "../api/getApi";

const initialState: eventsState = {
  events: [],
  isLoading: false,
  hasError: false,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload.data;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default eventsSlice.reducer;
