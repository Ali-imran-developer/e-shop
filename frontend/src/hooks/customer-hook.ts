// import { useCallback, useState } from "react";
// import { useAppDispatch } from "./store-hook";
// import CustomerControllers from "@/controllers/customerController";
// import { setCustomer } from "@/store/slices/customerSlice";

// export const useCustomer = () => {
//   const dispatch = useAppDispatch();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGetCustomer = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const data: any = await CustomerControllers.getCustomers();
//       console.log("@hookdata", data);
//       dispatch(setCustomer(data));
//     } catch (error) {
//       console.log("@Error", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   return {
//     handleGetCustomer,
//     isLoading,
//   };
// };
