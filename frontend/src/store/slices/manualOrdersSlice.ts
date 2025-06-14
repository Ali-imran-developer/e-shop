import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type initialStateType = {
  data: Product[] | null;
  isDataLoaded: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  data: null,
  isDataLoaded: false,
  error: null,
};

export const ManualOrdersSlice = createSlice({
  name: "ManualOrdersSlice",
  initialState,
  reducers: {
    setManualOrders: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isDataLoaded = false;
    },
  },
});

export const { setManualOrders, setError } = ManualOrdersSlice.actions;
export default ManualOrdersSlice.reducer;