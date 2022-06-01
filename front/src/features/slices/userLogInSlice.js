import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const logIn = createAsyncThunk(
  "LOGIN_USER",
  async ({ email, password }, thunkAPI) => {}
);
const initialState = {};
const userLogInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {},
  extraReducers: {},
});
export default userLogInSlice.reducer;
