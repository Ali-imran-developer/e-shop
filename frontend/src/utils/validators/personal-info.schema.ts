import { z } from "zod";
import { messages } from "@config/messages";
import { fileSchema, validateEmail } from "./common-rules";

// form zod validation schema
export const personalInfoFormSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }),
  userName: z.string().min(1, { message: messages.usernameRequired }),
  phone: z.string().optional(),
  email: validateEmail,
  avatar: fileSchema.optional(),
  role: z.string().optional(),
  country: z.string().min(1, { message: messages.countryIsRequired }),
  timezone: z.string().optional(),
  bio: z.string().optional(),
  portfolios: z.array(fileSchema).optional(),
  language: z
    .array(fileSchema)
    .min(1, { message: messages.languageIsRequired }),
  region: z.array(fileSchema).min(1, { message: messages.regionIsRequired }),
});

// generate form types from zod validation schema
export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,
  language: undefined,
  region: undefined,
};
