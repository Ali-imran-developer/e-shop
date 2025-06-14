import axios from "axios";
import AuthController from "@/controllers/authController";
export const APP_BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: APP_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const persistData = AuthController.getSession();

    if (persistData?.accessToken && !config.headers.Authorization) {
      config.headers[`Authorization`] = `Bearer ${persistData.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.log("@statusstatus", error.response.data.message);
      if (
        error.response.data.message === "Token could not be verified" &&
        status === 401
      ) {
        console.log("Unauthorized! Logging out...");
        // AuthController.logout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
