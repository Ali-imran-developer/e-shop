import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./axios";

export const signUp = createAsyncThunk(
  "auth/register",
  async (formData: any) => {
    const result = await axios.post("/register", formData);
    return result.data;
  }
);

export const login = createAsyncThunk("auth/login", async (formData: any) => {
  const result = await axios.post("/login", formData);
  return result.data;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const result = await axios.post("/logout");
  return result.data;
});

export const checkLoginStatus = createAsyncThunk(
  "auth/checkStatus",
  async () => {
    const response = await axios.get("/check-auth");
    return response.data;
  }
);

const UserSlice = createSlice({
  name: "User",
  initialState: {
    isLoading: false,
    user: null,
    isAuthChecked: false,
    isLoggedIn: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Login failed!";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(checkLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isAuthChecked = true;
      })
      .addCase(checkLoginStatus.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.isAuthChecked = true;
      });
  },
});

export default UserSlice.reducer;
