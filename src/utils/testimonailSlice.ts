import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Testimonial } from "./types";
const initialState: Testimonial[] = [];

const testimonialSlice = createSlice({
  name: "testimnonial",
  initialState,
  reducers: {
    addTestimonials: (state, action: PayloadAction<Testimonial[]>) => {
      return action.payload;
    },
  },
});
export const { addTestimonials } = testimonialSlice.actions;
export default testimonialSlice.reducer;
