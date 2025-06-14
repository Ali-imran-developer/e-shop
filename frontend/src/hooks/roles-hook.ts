import { useCallback, useState } from "react";
import { useAppDispatch } from "./store-hook";
import { setRoles } from "@/store/slices/rolesSlice";
import RolesController from "@/controllers/rolesController";

export const useRoles = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGetRoles = useCallback(async () => {
    try {
      setIsLoading(true);
      const data: any = await RolesController.getRoles();
      console.log("@Fetched Data:", data);
      dispatch(setRoles(data));
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateRoles = useCallback(async (
    payload = { name: "", permissions: [] },
  ) => {
    try {
      setIsLoading(true);
      const response = await RolesController.createRoles(payload);
      console.log("@Response", response);
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleUpdateRoles = useCallback(async (
    payload = { id: "" },
  ) => {
    try {
      setIsLoading(true);
      const response = await RolesController.UpdateRoles(payload);
      console.log("@Response", response);
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteRoles = useCallback(async (
    payload = { id: "" },
  ) => {
    try {
      setIsLoading(true);
      const response = await RolesController.DeleteRoles(payload);
      console.log("@Response", response);
    } catch (error) {
      console.log("@Error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    handleGetRoles,
    handleCreateRoles,
    handleDeleteRoles,
    handleUpdateRoles,
  };
};
