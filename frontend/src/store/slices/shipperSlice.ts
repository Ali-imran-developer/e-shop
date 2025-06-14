import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

interface FormValues {
  locationName?: string;
  city?: string;
  storeName?: string;
  phoneNumber?: string;
  address?: string;
  returnAddress?: string;
}

interface EditFormValues {
  formData?: FormValues;
  id?: string;
}

const initialState = {
  isLoading: false,
  shipperList: [],
};

export const addNewShipper = createAsyncThunk(
  "/shipperinfo/create",
  async (formData: FormValues) => {
    const result = await axios.post(
      `${BASE_URL}/api/shipperinfo/create`,
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

export const fetchAllShipper = createAsyncThunk(
  "/shipperinfo/get",
  async () => {
    const result = await axios.get(
      `${BASE_URL}/api/shipperinfo/get`,
      {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

export const editShipper = createAsyncThunk(
  "/shipperinfo/update",
  async ({ id, formData }: EditFormValues) => {
    const result = await axios.put(
      `${BASE_URL}/api/shipperinfo/update/${id}`,
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

export const deleteShipper = createAsyncThunk(
  "/shipperinfo/delete",
  async (id: string) => {
    const result = await axios.delete(
      `${BASE_URL}/api/shipperinfo/delete/${id}`, {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

const ShipperSlice = createSlice({
  name: "ShipperInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShipper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllShipper.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shipperList = action.payload.shipper ?? [];
      })
      .addCase(fetchAllShipper.rejected, (state) => {
        state.isLoading = false;
        state.shipperList = [];
      });
  },
});

export default ShipperSlice.reducer;