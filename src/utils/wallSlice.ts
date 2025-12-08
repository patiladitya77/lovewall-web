import { createSlice } from "@reduxjs/toolkit";

const wallSlice = createSlice({
  name: "wall",
  initialState: null,
  reducers: {
    addWalls: (state, action) => {
      return action.payload;
    },
  },
});
export const { addWalls } = wallSlice.actions;
export default wallSlice.reducer;
