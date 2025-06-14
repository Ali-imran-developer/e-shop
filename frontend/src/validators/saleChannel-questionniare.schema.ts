import { z } from "zod";
import { messages } from "@/config/messages";

export const formStep1Schema = z.object({
  currentCouriers: z.array(z.string()).min(1, messages.thisFieldIsRequired),
});
export type FormStep1Schema = z.infer<typeof formStep1Schema>;


export const formStep2Schema = z.object({
  orderBookingMethod: z.string().min(1, messages.thisFieldIsRequired),
  otherBookingMethod: z.string().optional(),
});
export type FormStep2Schema = z.infer<typeof formStep2Schema>;


export const formStep3Schema = z.object({
  Orderfulfillment: z.string().min(1, messages.thisFieldIsRequired),
});
export type FormStep3Schema = z.infer<typeof formStep3Schema>;


export const formStep4Schema = z.object({
  confirmBeforeDispatch: z.string().min(1, messages.thisFieldIsRequired),
});
export type FormStep4Schema = z.infer<typeof formStep4Schema>;


export const formStep5Schema = z.object({
  confirmationMethod: z.string().min(1, messages.thisFieldIsRequired),
  otherConfirmationMethod: z.string().optional(),
});
export type FormStep5Schema = z.infer<typeof formStep5Schema>;


export const formStep6Schema = z.object({
  hasBarcodeReader: z.string().optional()
});
export type FormStep6Schema = z.infer<typeof formStep6Schema>;