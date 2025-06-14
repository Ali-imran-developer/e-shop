import * as Yup from "yup";

export const validationProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("category is required"),
  subCategory: Yup.string().required("sub category is required"),
  
  variants: Yup.array().of(
    Yup.object().shape({
      sku: Yup.string().nullable(),
      imageId: Yup.number().nullable(),
      price: Yup.number().nullable().required("Price is required"),
      compareAtPrice: Yup.number().nullable(),
      costPerItem: Yup.number().nullable(),
      weight: Yup.number().nullable(),
      stock: Yup.object().shape({
        available: Yup.number().nullable().required("Stock is available"),
        inHand: Yup.number().nullable(),
      }),
    })
  ),
});
