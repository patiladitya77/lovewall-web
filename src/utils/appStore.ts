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
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
