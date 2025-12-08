import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import spaceReducer from "./spacesSlice";
import publicspaceReducer from "./publicSpaceSlice";
import testimonialReducer from "./testimonailSlice";
import wallReducer from "./wallSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    space: spaceReducer,
    publicspace: publicspaceReducer,
    testimonial: testimonialReducer,
    wall: wallReducer,
  },
});
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;
