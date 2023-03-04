import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    value: null,
  },
  reducers: {
    setPlayers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPlayers } = playersSlice.actions;
export default playersSlice.reducer;
