import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import accountReducer from "../features/account/accountSlice";

const preloadedState = {};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    accounts: accountReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState,
});
