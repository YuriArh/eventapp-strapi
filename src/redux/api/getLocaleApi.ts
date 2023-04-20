import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const token: string | undefined = process.env.REACT_APP_MAPBOX_TOKEN;

export const getLocale = createAsyncThunk(
  "event/getLocale",
  async ({ long, lat }: { long: string; lat: string }) => {
    try {
      console.log(long, lat);
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${token}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
