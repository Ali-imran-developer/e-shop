import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const initialState = {
  isLoading: false,
  OrderList: [],
  BookedOrderList: [],
};

export const addNewOrder = createAsyncThunk(
  "/orders/create",
  async (formData) => {
    const result = await axios.post(`${BASE_URL}/api/orders/create`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return result?.data;
  }
);

export const bookingOrder = createAsyncThunk(
  "/orders/booking",
  async (formData: any) => {
    const result = await axios.post(
      `${BASE_URL}/api/orders/booking`,
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

export const fetchAllOrders = createAsyncThunk("/orders/get", async () => {
  const result = await axios.get(`${BASE_URL}/api/orders/get`, {
    withCredentials: true,
  });
  return result?.data;
});

export const editOrder = createAsyncThunk(
  "/orders/update",
  async ({ id, formData }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/orders/update/${id}`,
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

export const deleteOrder = createAsyncThunk(
  "/orders/delete",
  async (id: String) => {
    const result = await axios.delete(`${BASE_URL}/api/orders/delete/${id}`, {
      withCredentials: true,
    });
    return result?.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/orders/status/update",
  async ({ id, status }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/orders/status/update/${id}`,
      { status },
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

export const fetchBookedOrders = createAsyncThunk(
  "/orders/booking/get",
  async () => {
    const result = await axios.get(`${BASE_URL}/api/orders/booking/get`, {
      withCredentials: true,
    });
    return result?.data;
  }
);

const OrdersSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.OrderList = action.payload.orders;
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.OrderList = [];
      })
      .addCase(fetchBookedOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.BookedOrderList = action.payload.bookOrders;
      })
      .addCase(fetchBookedOrders.rejected, (state) => {
        state.isLoading = false;
        state.BookedOrderList = [];
      });
  },
});

export default OrdersSlice.reducer;
