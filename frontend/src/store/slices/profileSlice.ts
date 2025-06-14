import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('profileState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('profileState', serializedState);
  } catch (err) {
    console.log('Error saving state to localStorage:', err);
  }
};

const persistedState = loadState();
const initialState = persistedState || {
  isLoading: false,
  profileList: {},
};

export const addNewProfile = createAsyncThunk(
  "/profile/create",
  async (formData) => {
    const result = await axios.post(
      `${BASE_URL}/api/profile/create`,
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

export const fetchProfile = createAsyncThunk(
  "/profile/get",
  async () => {
    const result = await axios.get(
      `${BASE_URL}/api/profile/get`, {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

export const editProfile = createAsyncThunk(
  "/profile/update",
  async ({ id, formData }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/profile/update/${id}`,
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

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileList = action.payload.profile;
        saveState(state); // Save state to localStorage
      })
      .addCase(addNewProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileList = action.payload.profile;
        saveState(state);
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileList = action.payload.profile;
        saveState(state);
      })
      .addCase(editProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default ProfileSlice.reducer;