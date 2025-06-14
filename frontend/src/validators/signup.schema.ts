import { z, ZodType } from "zod";
import * as Yup from "yup";

export const signUpSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  token: Yup.object({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    image: Yup.string().optional(),
  }),
});

export type formType = {
  apiKey: string;
  securityKey: string;
  password: string;
};
export const courierSchema: ZodType<formType> = z.object({
  apiKey: z.string(),
  securityKey: z.string(),
  password: z.string(),
});
export type CourierSchema = z.infer<typeof courierSchema>;
export type SignUpSchema = Yup.InferType<typeof signUpSchema>;
