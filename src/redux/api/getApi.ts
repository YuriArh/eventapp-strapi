import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEvents = createAsyncThunk("events/getEvents", async () => {
  try {
    const response = await axios.get(
      "http://localhost:1337/api/events?populate=*"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
