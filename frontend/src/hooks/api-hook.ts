import { useCallback } from "react";
import { CALLBACK_STATUS } from "@/config/enums";

// Define a custom hook to handle the request logic
export const useHandleRequest = () => {
  const handleRequest = useCallback(
    async (
      requestFn: (...args: any[]) => Promise<any>,
      callback: (status: CALLBACK_STATUS, value: any) => void,
      onSuccess?: (response: any) => Promise<any> | void
    ) => {
      try {
        callback(CALLBACK_STATUS.LOADING, true); // Trigger loading state
        const response = await requestFn();
        if (onSuccess) {
          await onSuccess(response); // If there's an onSuccess handler, invoke it
        }
        callback(CALLBACK_STATUS.SUCCESS, response); // Trigger success state
      } catch (error) {
        callback(CALLBACK_STATUS.ERROR, error); // Trigger error state
      } finally {
        callback(CALLBACK_STATUS.LOADING, false); // Trigger loading state completion
      }
    },
    []
  );

  return { handleRequest };
};
