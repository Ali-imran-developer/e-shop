import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const initialState = {
  isLoading: false,
  categoryList: [],
};

console.log("BASE_URL", BASE_URL);
export const addNewCategory = createAsyncThunk(
  "/categories/create",
  async (formData) => {
    const result = await axios.post(
      `${BASE_URL}/api/categories/create`,
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

export const fetchAllCategory = createAsyncThunk(
  "/categories/get",
  async () => {
    const result = await axios.get(
      `${BASE_URL}/api/categories/get`, {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

export const editCategory = createAsyncThunk(
  "/categories/update",
  async ({ id, formData }: any) => {
    const result = await axios.put(
      `${BASE_URL}/api/categories/update/${id}`,
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

export const deleteCategory = createAsyncThunk(
  "/categories/delete",
  async (id: string) => {
    const result = await axios.delete(
      `${BASE_URL}/api/categories/delete/${id}`, {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

export const deleteSubCategory = createAsyncThunk(
  "/subcategories/delete",
  async ({
    categoryId,
    subCategoryId,
  }: {
    categoryId: string;
    subCategoryId: string;
  }) => {
    const result = await axios.delete(
      `${BASE_URL}/api/subcategories/delete/${categoryId}/${subCategoryId}`, {
        withCredentials: true,
      }
    );
    return result?.data;
  }
);

const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload ?? [];
      })
      .addCase(fetchAllCategory.rejected, (state) => {
        state.isLoading = false;
        state.categoryList = [];
      });
  },
});

export default CategorySlice.reducer;