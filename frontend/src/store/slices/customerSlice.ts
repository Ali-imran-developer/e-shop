import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const initialState = {
  isLoading: false,
  customerList: [],
};

export const addNewCustomer = createAsyncThunk(
  "/customer/create",
  async (formData) => {
    const result = await axios.post(
      `${BASE_URL}/api/customer/create`,
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

export const fetchAllCustomers = createAsyncThunk("/customer/get", async () => {
  const result = await axios.get(`${BASE_URL}/api/customer/get`, {
    withCredentials: true,
  });
  return result?.data;
});

export const editCustomers = createAsyncThunk(
  "/customer/update",
  async ({ id, formData }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/customer/update/${id}`,
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

export const deleteCustomers = createAsyncThunk(
  "/customer/delete",
  async (id: String) => {
    const result = await axios.delete(
      `${BASE_URL}/api/customer/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

const CustomerSlice = createSlice({
  name: "Customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customerList = action.payload.customer ?? [];
      })
      .addCase(fetchAllCustomers.rejected, (state) => {
        state.isLoading = false;
        state.customerList = [];
      });
  },
});

export default CustomerSlice.reducer;