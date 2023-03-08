import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    value: {
      players: null,
      difficulty: null,
    },
  },
  reducers: {
    setPlayers: (state, action) => {
      state.value.players = action.payload;
    },
    setDifficulty: (state, action) => {
      state.value.difficulty = action.payload;
    },
  },
});

export const { setPlayers, setDifficulty } = playersSlice.actions;
export default playersSlice.reducer;
