import { configureStore } from "@reduxjs/toolkit";
import playersSlice from "./playersSlice";

const store = configureStore({
  reducer: { playersSlice },
});

export default store;
