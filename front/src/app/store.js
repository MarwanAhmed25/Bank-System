import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import accountReducer from "../features/account/accountSlice";
import authReducer from "../features/auth/authSlice";
import logReducer from "../features/logs/logSlice";

const preloadedState = {};

export const store = configureStore({
  reducer: {
    users: userReducer,
    accounts: accountReducer,
    logs: logReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState,
});
