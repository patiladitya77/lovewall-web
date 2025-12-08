import { createSlice } from "@reduxjs/toolkit";
import { Wall } from "./types";
const initialState: Wall[] = [];

const wallSlice = createSlice({
  name: "wall",
  initialState,
  reducers: {
    addWalls: (state, action) => {
      return action.payload;
    },
  },
});
export const { addWalls } = wallSlice.actions;
export default wallSlice.reducer;
