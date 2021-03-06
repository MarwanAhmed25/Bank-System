import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";

// Get account from localStorage
const accounts = JSON.parse(localStorage.getItem("accounts"));

const initialState = {
  accounts: accounts ? accounts : [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Approve Account
export const approveAccount = createAsyncThunk(
  "accounts/approve",
  async ({ slug, accepted }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.accountApproval(slug, accepted, token);
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

// Get user account
export const getAccount = createAsyncThunk(
  "accounts/getAccount",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const slug = thunkAPI.getState().auth.user.user.slug;

      return await accountService.userAccount(slug, token);
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

export const updateAccount = createAsyncThunk(
  "accounts/update",
  async (amount, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const slug = thunkAPI.getState().auth.user.user.slug;

      return await accountService.updateUserAccount(slug, amount, token);
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

export const getAllAccounts = createAsyncThunk(
  "accounts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await accountService.accountsList(token);
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

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // reset: (state) => initialState,
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload; //not sure
      })
      .addCase(approveAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accounts = action.payload;
      })
      .addCase(getAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accounts = action.payload;
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
