// import { useCallback, useState } from "react";
// import { useAppDispatch } from "./store-hook";
// import categoriesController from "@/controllers/categories";
// // import { setCategories } from "@/store/slices/categoriesSlice";

// export const useCategories = () => {
//   const dispatch = useAppDispatch();
//   const [Loading, setLoading] = useState(false);

//   const handleGetCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data: any = await categoriesController.getCategories();
//       console.log("@hookdata", data);
//       dispatch(setCategories(data));
//       return data;
//     } catch (error) {
//       console.log("@Error", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
//   const handleGetPublicCategories = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data: any = await categoriesController.getPublicCategories();
//       return data;
//     } catch (error) {
//       console.log("@Error", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return {
//     handleGetCategories,
//     handleGetPublicCategories,
//     Loading,
//     setLoading,
//   };
// };
