import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import spaceReducer from "./spacesSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    space: spaceReducer,
  },
});

export default appStore;
