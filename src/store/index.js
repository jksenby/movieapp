import { configureStore } from "@reduxjs/toolkit";
import { actionApi } from "../api/api";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: { [actionApi.reducerPath]: actionApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(actionApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export default store;
