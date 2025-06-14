import { apiClient } from "@/config/api.config";

export const apiRequest = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: any,
  headers?: any
) => {
  try {
    console.log("@@data", data);
    const response = await apiClient[method](url, data, headers);

    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    }
  } catch (error: any) {
    console.log("@error", error);

    throw error?.response
      ? {
          status: error.response.status,
          message: error.response.data?.message || "Request failed",
        }
      : { status: 500, message: "Server Error" };
  }
};
