// import { useCallback, useEffect, useState } from "react";
// import { CALLBACK_STATUS } from "../config/enums";
// import AuthController from "../controllers/authController";
// import ProductController from "../controllers/productController";
// import { useAppDispatch, useAppSelector } from "./store-hook";
// import { setProducts } from "../store/slices/productSlice";
// import toast from "react-hot-toast";

// export const useProduct = () => {
//   const dispatch = useAppDispatch();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleGetProducts = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const data: any = await ProductController.getAllProducts();
//       console.log("@data", data);
//       dispatch(setProducts(data));
//       return data
//     } catch (error) {
//       console.log("@Error", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const handleAddProduct = useCallback(
//     async (values: any, callback: (status: any, value: any) => void) => {
//       try {
//         const response: any = await ProductController.createProduct(values);
//         response && dispatch(setProducts(response));
//         callback && callback(CALLBACK_STATUS.SUCCESS, response);
//       } catch (error) {
//         callback && callback(CALLBACK_STATUS.ERROR, error);
//       } finally {
//         callback && callback(CALLBACK_STATUS.LOADING, false);
//       }
//     },
//     []
//   );
//   // const handleUpdateProduct = useCallback(
//   //   async (values: any, callback: (status: any, value: any) => void) => {
//   //     try {
//   //       const response: any = await ProductController.updateProduct(values);

//   //       console.log("@response", response);

//   //       response && dispatch(setProducts(response));
//   //       callback && callback(CALLBACK_STATUS.SUCCESS, response);
//   //     } catch (error) {
//   //       callback && callback(CALLBACK_STATUS.ERROR, error);
//   //     } finally {
//   //       callback && callback(CALLBACK_STATUS.LOADING, false);
//   //     }
//   //   },
//   //   []
//   // );

//   const handleDeleteProducts = useCallback(async (product_id: string) => {
//     try {
//       const data: any = await ProductController.deleteProduct(product_id);
//       toast.success(data?.response ?? "Product Delete Successfully");
//       await handleGetProducts();
//     } catch (error) {
//       console.log("@Error", error);
//     }
//   }, []);

//   return {
//     isLoading,
//     handleGetProducts,
//     handleAddProduct,
//     handleDeleteProducts,
//   };
// };
