import { z } from "zod";
import { messages } from "@config/messages";
import * as Yup from "yup";

const addressSchema = z.object({
  customerName: z.string().min(1, { message: messages.customerNameIsRequired }),
  phoneNumber: z
    .string({
      required_error: messages.phoneNumberIsRequired,
    })
    .min(2, { message: messages.phoneNumberIsRequired }),
  country: z.string().min(1, { message: messages.countryIsRequired }),
  state: z.string().min(1, { message: messages.stateIsRequired }),
  city: z.string().min(1, { message: messages.cityIsRequired }),
  zip: z.string().min(1, { message: messages.zipCodeRequired }),
  street: z.string().min(1, { message: messages.streetIsRequired }),
});

// form zod validation schema
export const orderFormSchema = z.object({
  billingAddress: addressSchema,
  sameShippingAddress: z.boolean(),
  shippingAddress: z
    .object({
      customerName: z.string().optional(),
      phoneNumber: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      zip: z.string().optional(),
      street: z.string().optional(),
    })
    .optional(),
  note: z.string().optional(),
  paymentMethod: z.string().optional(),
  shippingMethod: z.string().optional(),
  shippingSpeed: z.string().optional(),
  cardPayment: z
    .object({
      cardNumber: z.string().optional(),
      expireMonth: z.string().optional(),
      expireYear: z.string().optional(),
      cardCVC: z.string().optional(),
      cardUserName: z.string().optional(),
      isSaveCard: z.boolean().optional(),
    })
    .optional(),
});

export const shipmentDetailsSchema = Yup.object().shape({
  shipperId: Yup.string().required("Shipper is required"),
  shipmentDetails: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    addresses: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Name is required"),
          phone: Yup.string()
            .required("Phone is required")
            .matches(/^(\+92|0)?3[0-9]{9}$/, "Phone must be a valid  number"),

          city: Yup.object()
            .shape({
              city: Yup.string().required("City is required"),
            })
            .required("City is required"),
          address1: Yup.string().required("Address Line 1 is required"),
          address2: Yup.string(), // optional
          company: Yup.string(), // optional
          country: Yup.string().required("Country is required"),
        })
      )
      .min(1, "At least one address is required"),
  }),
}) as Yup.ObjectSchema<any>;
export const shipmentDetailsResellingSchema = Yup.object().shape({
  shipmentDetails: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    addresses: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Name is required"),
          phone: Yup.string()
            .required("Phone is required")
            .matches(/^(\+92|0)?3[0-9]{9}$/, "Phone must be a valid  number"),

          city: Yup.object()
            .shape({
              city: Yup.string().required("City is required"),
            })
            .required("City is required"),
          address1: Yup.string().required("Address Line 1 is required"),
          address2: Yup.string(), // optional
          company: Yup.string(), // optional
          country: Yup.string().required("Country is required"),
        })
      )
      .min(1, "At least one address is required"),
  }),
}) as Yup.ObjectSchema<any>;

export type ShipmentDetailsSchema = Yup.InferType<typeof shipmentDetailsSchema>;
export type ShipmentDetailsResellingSchema = Yup.InferType<
  typeof shipmentDetailsResellingSchema
>;
// generate form types from zod validation schema
export type CreateOrderInput = z.infer<typeof orderFormSchema>;
