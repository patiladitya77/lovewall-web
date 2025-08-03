import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import spaceReducer from "./spacesSlice";
import testimonialReducer from "./testimonailSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    space: spaceReducer,
    testimonial: testimonialReducer,
  },
});

export default appStore;
