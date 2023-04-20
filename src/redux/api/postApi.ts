import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewEventData } from "../../interfaces/NewEvent";
import Event from "../../interfaces/Event";
import axios, { AxiosError } from "axios";

import { MyKnownError } from "../../interfaces/NewEvent";

export const createEvent = createAsyncThunk<
  Event[],
  NewEventData,
  { rejectValue: MyKnownError }
>(
  "newEvent/createEvent",

  async (newEvent, { rejectWithValue }) => {
    console.log(newEvent);
    try {
      const response = await axios.post("http://localhost:1337/api/events", {
        data: newEvent,
      });
      return response.data;
    } catch (error: any) {
      const err = error as AxiosError<MyKnownError>;
      return err.response?.data.message;
    }
  }
);
