import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
  name: "testimnonial",
  initialState: null,
  reducers: {
    addTestimonials: (state, action) => {
      return action.payload;
    },
  },
});
export const { addTestimonials } = testimonialSlice.actions;
export default testimonialSlice.reducer;
