import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const initialState = {
  isLoading: false,
  StoresList: [],
};

export const fetchAllStores = createAsyncThunk("/store/get", async () => {
  const result = await axios.get(`${BASE_URL}/api/store/get`, {
    withCredentials: true,
  });
  return result?.data;
});

export const editStore = createAsyncThunk(
  "/store/update",
  async ({ id, formData }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/store/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

const StoreSlice = createSlice({
  name: "Stores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.StoresList = action.payload.store;
      })
      .addCase(fetchAllStores.rejected, (state) => {
        state.isLoading = false;
        state.StoresList = [];
      });
  },
});

export default StoreSlice.reducer;