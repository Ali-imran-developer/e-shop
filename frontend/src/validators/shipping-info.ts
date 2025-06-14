import { z } from "zod";

const validationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be 100 characters or less" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email must be 100 characters or less" }),

  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(200, { message: "Address must be 200 characters or less" }),

  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^(\+92|0)?3[0-9]{9}$/, {
      message: "Phone must be a valid number",
    }),

  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(100, { message: "City must be 100 characters or less" }),
});

export default validationSchema;
