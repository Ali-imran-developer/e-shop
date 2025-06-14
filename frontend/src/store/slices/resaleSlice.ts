import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  resellerData: any
  listData: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: null,
  resellerData: null,
  listData: null,
  isDataLoaded: false,
};

export const ResaleProductSlice = createSlice({
  name: "ResaleProductSlice",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
    setResaleProducts: (state, action: PayloadAction<any>) => {
      state.listData = action.payload;
    },
    setResellerOrder: (state, action: PayloadAction<any>) => {
      state.resellerData = action.payload;
    },
  },
});

export const { setProducts, setResaleProducts, setResellerOrder } = ResaleProductSlice.actions;
export default ResaleProductSlice.reducer;