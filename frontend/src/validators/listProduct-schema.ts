import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  discount: Yup.number()
    .typeError("Discount must be a number")
    .required("Discount is required"),

  inventory: Yup.number()
    .typeError("Inventory must be a number")
    .required("Inventory is required"),

  category: Yup.string().required("Category is required"),

  subCategory: Yup.string().required("Sub Category is required"),

  shippingCharges: Yup.array()
    .of(
      Yup.object().shape({
        fromPrice: Yup.number()
          .typeError("From Price must be a number")
          .required("Price required"),
        toPrice: Yup.number()
          .typeError("To Price must be a number")
          .required("Price required"),
        totalPrice: Yup.number()
          .typeError("Total Price must be a number")
          .required("Price required"),
      })
    )
    .min(1, "At least one shipping charge is required"),
});
