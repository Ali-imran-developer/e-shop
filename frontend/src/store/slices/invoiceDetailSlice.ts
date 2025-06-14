import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: null,
  isDataLoaded: false,
};

export const InvoiceDetailSlice = createSlice({
  name: "InvoiceDetailSlice",
  initialState,
  reducers: {
    setInvoiceDetail: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setInvoiceDetail } = InvoiceDetailSlice.actions;
export default InvoiceDetailSlice.reducer;