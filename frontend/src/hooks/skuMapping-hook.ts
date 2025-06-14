import { useCallback, useState } from "react";
import { CALLBACK_STATUS } from "../config/enums";
import { useAppDispatch } from "./store-hook";
import {
  setSkuMapping,
  updateSkuMapping,
} from "../store/slices/skuMappingSlice";
import SkuMappingController from "@/controllers/skumappingController";
// import toast from "react-hot-toast";

export const useSkuMapping = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [previouslyMappedValues, setPreviouslyMappedValues] = useState<{ [key: string]: any }>({});
  // const [otherStoreProducts, setOtherStoreProducts] = useState({});
  // const [SKUValue, setSKUValue] = useState("");
  // const [SKUId, setSKUId] = useState("");
  // const [newSKU, setNewSKU] = useState("");
  // const [masterStoreProducts, setMasterStoreProducts] = useState<{ sku: string; _id: string }[]>([]);

  const handleGetSkuMapping = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await SkuMappingController.getVariantsForSkuMapping();
      console.log("SKU Mapping data:", data);
      dispatch(setSkuMapping(data));
    } catch (error) {
      console.error("SKU Mapping error:", error);
      dispatch(setSkuMapping([]));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const handleUpdateSkuMapping = useCallback(
    async (
      values: any,
      callback?: (status: CALLBACK_STATUS, value: any) => void
    ) => {
      try {
        const response = await SkuMappingController.updateSkuMapping(values);
        console.log("SKU Mapping update response:", response);
        dispatch(updateSkuMapping(response));
        callback?.(CALLBACK_STATUS.SUCCESS, response);
      } catch (error) {
        console.error("SKU Mapping update error:", error);
        callback?.(CALLBACK_STATUS.ERROR, error);
      } finally {
        callback?.(CALLBACK_STATUS.LOADING, false);
      }
    },
    [dispatch]
  );

  // const loadProductsforOtherStore = async (id: any, masterProds: any) => {
  //   try {
  //     const { data } = await SkuMappingController.getVariantsForSkuMapping(id);
  //     const itemsByStoreId: { [key: string]: any[] } = {};
  //     const prevMappedValuesClone: { [key: string]: any } = { ...previouslyMappedValues };

  //     for (const variant of data) {
  //       const item = {
  //         label: `${variant.sku}/${variant.productMain[0].title}`,
  //         value: variant,
  //       };
  //       if (
  //         Object.keys(itemsByStoreId).length > 0 &&
  //         itemsByStoreId[variant.storeId]
  //       ) {
  //         itemsByStoreId[variant.storeId] = [
  //           ...itemsByStoreId[variant.storeId],
  //           item,
  //         ];
  //       } else {
  //         itemsByStoreId[variant.storeId] = [item];
  //       }
  //       if (variant.masterId) {
  //         // const row = masterProds.find(
  //         //   (d) => d.masterId === variant.masterId && d.isMasterVariant === true
  //         // );
  //         const key = `${variant.masterId}/${variant.storeId}`;
  //         prevMappedValuesClone[key] = {
  //           label: `${variant.sku}/${variant.productMain[0].title}`,
  //           value: variant,
  //         };
  //       }
  //     }
  //     setPreviouslyMappedValues(prevMappedValuesClone);
  //     setOtherStoreProducts(itemsByStoreId);
  //     return Object.keys(prevMappedValuesClone);
  //   } catch (err) {
  //     toast.error("Error in Loading Other Stores Products!");
  //   }
  // };

  // const handleUpdateVariantSKU = async (variantId: any, sku: any, storeId: any, _id: any) => {
  //   try {
  //     await SkuMappingController.updateVariantSKU(variantId, sku, storeId);
  //     setSKUValue("");
  //     let list = masterStoreProducts.map((p) => {
  //       if (p.sku === SKUValue && p._id === _id) {
  //         p.sku = newSKU;
  //       }
  //       return p;
  //     });
  //     setMasterStoreProducts(list);
  //     setNewSKU("");
  //     setSKUId("");
  //   } catch (err) {
  //     toast.error("Error in Loading SKU Updation Result!");
  //   }
  // };

  return {
    isLoading,
    handleGetSkuMapping,
    handleUpdateSkuMapping,
    // loadProductsforOtherStore,
    // handleUpdateVariantSKU,
  };
};
