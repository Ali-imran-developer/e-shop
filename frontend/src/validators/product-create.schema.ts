import { z } from "zod";

export const CreateProductSchema = z.object({
  title: z.string().optional(),
  productType: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["Available", "Unavailable", "Out of Stock"]).optional(),
  createdAt: z.string().optional(), // If a date, consider z.date()

  seo: z
    .object({
      title: z.string().optional(),
      metaKeywords: z.string().optional(),
      metaDescription: z.string().optional(),
      productUrl: z.string().url().optional(),
    })
    .optional(),

  shipping: z
    .object({
      isCost: z.boolean().optional(),
      price: z.number().nullable().optional(),
      isLocationBased: z.boolean().optional(),
      ShippingLocation: z
        .array(
          z.object({
            name: z.string().optional(),
            price: z.number().nullable().optional(),
          })
        )
        .optional(),
    })
    .optional(),

  identifiers: z
    .object({
      globalTradeItemNumber: z.number().nullable().optional(),
      manufacturerNumber: z.number().nullable().optional(),
      brandName: z.string().optional(),
      productUpc: z.number().nullable().optional(),
      custom: z
        .array(
          z.object({
            name: z.string().optional(),
            value: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),

  stock: z
    .object({
      trackStockNull: z.boolean().optional(),
      available: z.number().nullable().optional(),
      inHand: z.number().nullable().optional(),
    })
    .optional(),

  variants: z
    .array(
      z.object({
        sku: z.string().optional(),
        price: z.number().nullable().optional(),
        compareAtPrice: z.number().nullable().optional(),
        costPerItem: z.number().nullable().optional(),
        weight: z.number().nullable().optional(),
      })
    )
    .optional(),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
