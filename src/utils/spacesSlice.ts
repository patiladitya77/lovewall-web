import { createSlice } from "@reduxjs/toolkit";

const spacesSlice = createSlice({
  name: "space",
  initialState: {
    spaces: [],
    space: null,
  },
  reducers: {
    addSpaces: (state, action) => {
      state.spaces = action.payload;
    },
    addCurrentSpace: (state, action) => {
      state.space = action.payload;
    },
  },
});
export const { addSpaces, addCurrentSpace } = spacesSlice.actions;
export default spacesSlice.reducer;
