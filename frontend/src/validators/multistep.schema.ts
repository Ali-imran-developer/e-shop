import { z } from "zod";
import { messages } from "@/config/messages";

// Step 1
export const formStep1Schema = z.object({
  currentlySelling: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep1Schema = z.infer<typeof formStep1Schema>;

// Step 2
export const formStep2Schema = z.object({
  salesChannel: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep2Schema = z.infer<typeof formStep2Schema>;

// Step 3
export const formStep3Schema = z.object({
  placeType: z.string().array().min(1, messages.thisFieldIsRequired),
});

export type FormStep3Schema = z.infer<typeof formStep3Schema>;

// Step 4
export const formStep4Schema = z.object({
  products: z.array(z.string()).min(1, messages.thisFieldIsRequired),
});

export type FormStep4Schema = z.infer<typeof formStep4Schema>;

// Step 5
export const formStep5Schema = z.object({
  inventory: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep5Schema = z.infer<typeof formStep5Schema>;

// Step 6
export const formStep6Schema = z.object({
  resellersProducts: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep6Schema = z.infer<typeof formStep6Schema>;

// Step 7
export const formStep7Schema = z.object({
  resellersOperate: z.array(z.string()).min(1, messages.thisFieldIsRequired),
});

export type FormStep7Schema = z.infer<typeof formStep7Schema>;

// Step 8
export const formStep8Schema = z.object({
  manageResellers: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep8Schema = z.infer<typeof formStep8Schema>;

// Step 9
export const formStep9Schema = z.object({
  primaryChallenge: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep9Schema = z.infer<typeof formStep9Schema>;

// Step 10
export const formStep10Schema = z.object({
  sellProducts: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep10Schema = z.infer<typeof formStep10Schema>;

// Step 11
export const formStep11Schema = z.object({
  viaDropshipping: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep11Schema = z.infer<typeof formStep11Schema>;

// Step 12
export const formStep12Schema = z.object({
  hearAboutShopilam: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep12Schema = z.infer<typeof formStep12Schema>;
