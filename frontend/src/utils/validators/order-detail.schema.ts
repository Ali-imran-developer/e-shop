import { z } from "zod";
import { messages } from "@config/messages";
import { validateEmail } from "./common-rules";

export const customerDetailSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  text: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  address: z.string().min(1, { message: messages.nameIsRequired }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^(\+92|0)?3[0-9]{9}$/, {
      message: "Phone must be a valid  number",
    }),
});

export type CustomerDetailSchema = z.infer<typeof customerDetailSchema>;

export const shippingDetailSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  text: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  address: z.string().min(1, { message: messages.nameIsRequired }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^(\+92|0)?3[0-9]{9}$/, {
      message: "Phone must be a valid  number",
    }),
});

export type ShippingDetailSchema = z.infer<typeof customerDetailSchema>;
