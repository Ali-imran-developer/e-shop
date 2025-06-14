import { z } from "zod";

export const addInfoSchema = z.object({
  labelStoreName: z.string().min(1, { message: "Store Name is required!." }),
  // refrenceNumber: z.string().min(1, { message: "Store Name is required!." }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required!." }),
  locationName: z.string().min(1, { message: "Location Name is required!." }),
  // shipperEmail: z.string().min(1, { message: "Store Name is required!." }),
  city: z.string().min(1, { message: "City is required!." }),
  returnAddress: z.string().min(1, { message: "Return Address is required!." }),
  address: z.string().min(1, { message: "Address is required!." }),
});

export type AddShippingInfoTypes = z.infer<typeof addInfoSchema>;
