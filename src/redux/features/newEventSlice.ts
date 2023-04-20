import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewEvent, NewEventData } from "../../interfaces/NewEvent";
import { createEvent } from "../api/postApi";
import FormData from "form-data";
import { MyKnownError } from "../../interfaces/NewEvent";

const initialState: NewEvent = {
  data: {},
  isPosting: false,
  error: "",
};

const newEventSlice = createSlice({
  name: "newEvent",
  initialState,
  reducers: {
    addEventInfo: (state, action: PayloadAction<NewEventData>) => {
      const { name, desc, date, time } = action.payload;
      state.data.name = name;
      state.data.desc = desc;
      state.data.date = date;
      state.data.time = time;
    },
    addEventLocale: (state, action: PayloadAction<NewEventData>) => {
      const { long, lat } = action.payload;
      state.data.long = long;
      state.data.lat = lat;
    },
    cancelAddingEvent: (state) => {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(createEvent.pending, (state, action) => {
      state.isPosting = true;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.isPosting = false;
    });
    builder.addCase(createEvent.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
    });
  },
});

export const { addEventInfo, addEventLocale, cancelAddingEvent } =
  newEventSlice.actions;

export default newEventSlice.reducer;
