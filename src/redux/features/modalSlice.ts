import { createSlice } from "@reduxjs/toolkit";

type modalState = {
  modal: boolean;
  locationInfo: boolean;
};

const initialState: modalState = {
  modal: false,
  locationInfo: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
    openLocationInfo(state) {
      state.locationInfo = true;
      state.modal = false;
    },
    closeLocationInfo(state) {
      state.locationInfo = false;
    },
  },
});

export const { openModal, closeModal, openLocationInfo, closeLocationInfo } =
  modalSlice.actions;

export default modalSlice.reducer;
