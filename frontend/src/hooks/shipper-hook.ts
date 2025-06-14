import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShipperInfoController from "@/controllers/shipper-info";
import { useNavigate } from "react-router-dom";

interface ShipperInfoType {
  _id?: string;
  labelStoreName?: string;
  phoneNumber?: string;
  locationName?: string;
  city?: string;
  returnAddress?: string;
  address?: string;
  storeId: string;
}

export const useShipperData = (storeId?: string) => {
  const [shippers, setShippers] = useState<ShipperInfoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchShippers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.getAllShipperInfo();
      const filteredShippers = response?.filter(
        (item: ShipperInfoType) => item.storeId === storeId
      );
      setShippers(filteredShippers);
    } catch (error) {
      console.error("Error fetching shippers:", error);
      toast.error("Failed to fetch shippers");
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  const addShipper = useCallback(async (values: ShipperInfoType, callback?: (status: string, value?: any) => void) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.addShipperInfo(values);
      setShippers((prev) => [...prev, response]);
      callback?.("success", response);
      toast.success("Shipper added successfully!");
    } catch (error) {
      console.error("Error adding shipper:", error);
      callback?.("error", error);
      toast.error("Failed to add shipper");
    } finally {
      setIsLoading(false);
    }
  }, []);

//   const updateShipper = useCallback(async (values: ShipperInfoType, callback?: (status: string, value?: any) => void) => {
//     try {
//       setIsLoading(true);
//       const response = await ShipperInfoController.editShipperInfo(values);
//       setShippers((prev) => prev.map((item) => (item._id === values._id ? response : item)));
//       callback?.("success", response);
//       toast.success("Shipper updated successfully!");
//     } catch (error) {
//       console.error("Error updating shipper:", error);
//       callback?.("error", error);
//       toast.error("Failed to update shipper");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

  const deleteShipper = useCallback(async (shipperId: string, callback?: (status: string, value?: any) => void) => {
    try {
      setIsLoading(true);
      await ShipperInfoController.removeShipperInfo(shipperId);
      setShippers((prev) => prev.filter((item) => item._id !== shipperId));
      callback?.("success");
      toast.success("Shipper deleted successfully!");
    } catch (error) {
      console.error("Error deleting shipper:", error);
      callback?.("error", error);
      toast.error("Failed to delete shipper");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditShipper = (shipper: ShipperInfoType) => {
    console.log("test2:", shipper?._id)
    navigate(`/sales-channel/${shipper?._id}`, {
      state: { shipper, mode: "edit" },
    });
  };

  useEffect(() => {
    if (storeId) fetchShippers();
  }, [fetchShippers, storeId]);

  return {
    shippers,
    isLoading,
    fetchShippers,
    addShipper,
    // updateShipper,
    deleteShipper,
    handleEditShipper,
  };
};
