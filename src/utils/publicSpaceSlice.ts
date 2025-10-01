import { createSlice } from "@reduxjs/toolkit";

const publicSpaceSlice = createSlice({
  name: "publicspace",
  initialState: {
    publicSpace: null,
  },
  reducers: {
    addPublicSpaces: (state, action) => {
      state.publicSpace = action.payload;
    },
  },
});
export const { addPublicSpaces } = publicSpaceSlice.actions;
export default publicSpaceSlice.reducer;
