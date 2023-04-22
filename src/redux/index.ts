import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import eventsReducer from "./features/eventsSlice";
import modalReducer from "./features/modalSlice";
import newEventReducer from "./features/newEventSlice";
import localeReducer from "./features/localeSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    modal: modalReducer,
    newEvent: newEventReducer,
    locale: localeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
