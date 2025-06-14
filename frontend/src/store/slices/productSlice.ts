import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/create",
  async (formData) => {
    const result = await axios.post(
      `${BASE_URL}/api/products/create`,
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

export const fetchAllProducts = createAsyncThunk("/products/get", async () => {
  const result = await axios.get(`${BASE_URL}/api/products/get`, {
    withCredentials: true,
  });
  return result?.data;
});

export const editProduct = createAsyncThunk(
  "/products/update",
  async ({ id, formData }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/products/update/${id}`,
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

export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const result = await axios.delete(
      `${BASE_URL}/api/products/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.products ?? [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default ProductsSlice.reducer;
