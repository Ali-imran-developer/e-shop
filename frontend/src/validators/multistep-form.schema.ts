import { z } from "zod";
import { messages } from "@/config/messages";
import { fileSchema } from "./common-rules";

// step 2
export const propertyTypeSchema = z.object({
  products: z.string().min(1, messages.propertyTypeIsRequired),
});

// generate form types from zod validation schema
export type PropertyTypeSchema = z.infer<typeof propertyTypeSchema>;

export const typeSchema = z.object({
  type: z.string().min(1, messages.propertyTypeIsRequired),
});

// generate form types from zod validation schema
export type TypeSchema = z.infer<typeof typeSchema>;

// step 3
export const sellingOnlineSchema = z.object({
  sellingOnline: z.string().min(1, messages.sellingOnlineIsRequired),
});

export type sellingOnlineSchema = z.infer<typeof sellingOnlineSchema>;

// step 4
export const locationSchema = z.object({
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export type LocationSchema = z.infer<typeof locationSchema>;

// step 5
export const formStep5Schema = z.object({
  guests: z.number().positive(),
  bedrooms: z.number().positive().optional(),
  beds: z.number().positive().optional(),
  guestType: z.string().min(1, messages.thisFieldIsRequired),
  bedroomLock: z.string().min(1, messages.thisFieldIsRequired),
});

export type FormStep5Schema = z.infer<typeof formStep5Schema>;

// step 6
export const formStep6Schema = z.object({
  sellingChannels: z.array(z.string()).min(1, messages.amenitiesAreRequired),
  outdoorAmenities: z.array(z.string()).optional(),
});

export type FormStep6Schema = z.infer<typeof formStep6Schema>;

// step 7
export const formStep7Schema = z.object({
  propertyName: z.string().min(1, messages.propertyNameIsRequired),
  propertyDescription: z.string().optional(),
  priceRange: z.number().array().optional(),
  photos: z.array(fileSchema).optional(),
});

export type FormStep7Schema = z.infer<typeof formStep7Schema>;
