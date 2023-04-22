import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewEvent, NewEventData } from "../../interfaces/NewEvent";
import { createEvent } from "../api/postApi";
import FormData from "form-data";
import { MyKnownError } from "../../interfaces/NewEvent";

const initialState: NewEvent = {
  data: new FormData(),
  isPosting: false,
  error: "",
};

const newEventSlice = createSlice({
  name: "newEvent",
  initialState,
  reducers: {
    addEventInfo: (state, action: PayloadAction<NewEventData>) => {
      const { name, description, date, time, acceptedFiles } = action.payload;
      console.log(acceptedFiles);
      state.data.append(
        "data",
        JSON.stringify({ name, description, date, time })
      );
      state.data.append("img", acceptedFiles ? acceptedFiles[0] : null);
      console.log(state.data);
    },
    addEventLocale: (state, action: PayloadAction<NewEventData>) => {
      const { long, lat } = action.payload;
      state.data.append("data", JSON.stringify({ long, lat }));
      console.log(state.data.read());
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
