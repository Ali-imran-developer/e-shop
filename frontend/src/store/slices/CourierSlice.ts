import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const initialState = {
  isLoading: false,
  CourierList: [],
};

export const addNewCourier = createAsyncThunk(
  "/courier/create",
  async (formData: any) => {
    const result = await axios.post(
      `${BASE_URL}/api/courier/create`,
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

export const fetchAllCourier = createAsyncThunk("/courier/get", async () => {
  const result = await axios.get(`${BASE_URL}/api/courier/get`);
  return result?.data;
});

export const editCourier = createAsyncThunk(
  "/courier/update",
  async ({ id, formData }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/courier/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteCourier = createAsyncThunk("/courier/delete", async (id) => {
  const result = await axios.delete(
    `${BASE_URL}/api/courier/delete/${id}`
  );
  return result?.data;
});

const CourierSlice = createSlice({
  name: "Courier",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCourier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.CourierList = action.payload.courier ?? [];
      })
      .addCase(fetchAllCourier.rejected, (state) => {
        state.isLoading = false;
        state.CourierList = [];
      });
  },
});

export default CourierSlice.reducer;
