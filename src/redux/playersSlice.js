import { createSlice } from "@reduxjs/toolkit";

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    players: null,
    difficulty: null,
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
  },
});

export const { setPlayers, setDifficulty } = playersSlice.actions;
export default playersSlice.reducer;
