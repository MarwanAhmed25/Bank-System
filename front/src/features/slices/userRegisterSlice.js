import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "REGISTER_USER",
  async ({ name, email, password }, thunkAPI) => {}
);
const initialState = {};
const userRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {},
});
export default userRegisterSlice.reducer;
