import * as Yup from "yup";

export const createOrderSchema = Yup.object({
  productId: Yup.string(),

  lineItems: Yup.array().of(Yup.object()),

  currentTotalPrice: Yup.number().min(0, "Total price cannot be negative"),

  tags: Yup.array().of(Yup.string()),

  paymentMethod: Yup.string()
    .oneOf(["COD", "Credit Card", "PayPal"], "Invalid payment method")
    .required("Payment method is required"),

  shipmentDetails: Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    addresses: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required("Name is required"),
          phone: Yup.string()
            .required("Phone is required")
            .matches(/^(\+92|0)?3[0-9]{9}$/, "Phone must be a valid  number"),

          city: Yup.string().required("City is required"),
          address1: Yup.string().required("Address is required"),
          address2: Yup.string(),
          company: Yup.string(),
          country: Yup.string(),
          // province and zip are commented out – add if needed
        })
      )
      .min(1, "At least one address is required"),
  }),

  financialStatus: Yup.string().oneOf(
    ["pending", "paid", "refunded"],
    "Invalid financial status"
  ),

  status: Yup.string().oneOf(
    ["open", "closed", "cancelled"],
    "Invalid order status"
  ),

  pricing: Yup.object({
    subTotal: Yup.number().min(0, "Subtotal cannot be negative"),
    currentTotalPrice: Yup.number().min(0),
    paid: Yup.number().min(0),
    balance: Yup.number().min(0),
    shipping: Yup.number().min(0),
    taxPercentage: Yup.number().min(0),
    taxValue: Yup.number().min(0),
    extra: Yup.array().of(
      Yup.object({
        key: Yup.string(),
        value: Yup.number().min(0),
      })
    ),
    // If you decide to add discount back:
    // discount: Yup.object({
    //   key: Yup.string().required(),
    //   value: Yup.number().min(0).required(),
    // }),
  }),

  createdAt: Yup.string().required("Creation date is required"),
});
