import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: null,
  isDataLoaded: false,
};

export const InvoiceSlice = createSlice({
  name: "InvoiceSlice",
  initialState,
  reducers: {
    setInvoice: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
    updateInvoice: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setInvoice,updateInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;