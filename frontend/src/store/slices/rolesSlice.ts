import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  data: any;
  isDataLoaded: boolean;
};

const initialState: initialStateType = {
  data: null,
  isDataLoaded: false,
};

export const RolesSlice = createSlice({
  name: "RolesSlice",
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const { setRoles } = RolesSlice.actions;
export default RolesSlice.reducer;