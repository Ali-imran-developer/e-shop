import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const URL = `${BASE_URL}/api`;
interface ApiThunkParams {
  typePrefix: string;
  method: string;
  endpoint: string | ((payload: any) => string);
}

export const createApiThunk = ({
  typePrefix,
  method,
  endpoint,
}: ApiThunkParams) =>
  createAsyncThunk<any, any>(typePrefix, async (payload = {}) => {
    try {
      const resolvedUrl =
        typeof endpoint === "function"
          ? `${URL}${endpoint(payload)}`
          : `${URL}${endpoint}`;

      const config = {
        method,
        url: resolvedUrl,
        data: payload?.data || {},
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw err.response?.data || err.message;
      }
      throw err;
    }
  });
