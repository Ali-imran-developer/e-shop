import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SkuMappingState {
  data: any[];
  isDataLoaded: boolean;
}

const initialState: SkuMappingState = {
  data: [],
  isDataLoaded: false,
};

export const SkuMappingSlice = createSlice({
  name: "SkuMappingSlice",
  initialState,
  reducers: {
    setSkuMapping: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
    updateSkuMapping: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setSkuMapping, updateSkuMapping } = SkuMappingSlice.actions;
export default SkuMappingSlice.reducer;