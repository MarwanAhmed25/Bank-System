import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logService from "./logService";

// Get account from localStorage
const logs = JSON.parse(localStorage.getItem("logs"));

const initialState = {
  logs: logs ? logs : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUserLog = createAsyncThunk(
  "logs/getUserLog",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await logService.getUserLog(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLogs = createAsyncThunk("logs/getLogs", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await logService.getLogs(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createLog = createAsyncThunk(
  "logs/create",
  async (logDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const slug = thunkAPI.getState().auth.user.user.slug;

      return await logService.createLog(slug, logDetails, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs = action.payload;
      })
      .addCase(getUserLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.logs = [];
      });
  },
});

export const { reset } = logSlice.actions;
export default logSlice.reducer;
