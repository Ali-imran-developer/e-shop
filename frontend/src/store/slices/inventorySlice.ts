import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: [],
  isDataLoaded: false,
};

export const InventoryProductSlice = createSlice({
  name: "InventoryProductSlice",
  initialState,
  reducers: {
    setInventoryProducts: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
    updateInventoryProducts: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setInventoryProducts,updateInventoryProducts } = InventoryProductSlice.actions;
export default InventoryProductSlice.reducer;