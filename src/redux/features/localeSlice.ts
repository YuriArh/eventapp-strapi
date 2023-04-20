import { createSlice } from "@reduxjs/toolkit";
import LocaleState from "../../interfaces/LocaleState";
import { getLocale } from "../api/getLocaleApi";

const initialState: LocaleState = {
  locale: "",
  isLoading: false,
  hasError: false,
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLocale.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getLocale.fulfilled, (state, action) => {
        state.locale = action.payload.features[0].place_name;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getLocale.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default localeSlice.reducer;
