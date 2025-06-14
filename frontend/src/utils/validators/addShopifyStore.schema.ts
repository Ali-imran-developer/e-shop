import { z } from "zod";
import { messages } from "@config/messages";
import { fileSchema, validateEmail } from "./common-rules";

// form zod validation schema
export const addShopifySchema = z.object({
  domainName: z.string().min(1, { message: messages.domainNameIsRequired }),
  accessToken: z.string().min(1, { message: messages.accessTokenIsRequired }),
  apiKey: z.string().min(1, { message: messages.apiKeyIsRequired }),
  sharedSecretKey: z.string().min(1, { message: messages.sharedSecretKeyIsRequired }),
  storeName: z.string().min(1, { message: messages.storeNameIsRequired }),
  url: z.string().min(1, { message: messages.urlIsRequired }),
  email: validateEmail,
  phoneNumber: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  avatar: fileSchema.optional(),
});

// generate form types from zod validation schema
export type AddShopifyInfoFormTypes = z.infer<typeof addShopifySchema>;
