// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Example reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
