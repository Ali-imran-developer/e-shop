import { z } from "zod";

// form zod validation schema
export const rolePermissionSchema = z.object({
  // administrator: z.array(z.string()).optional(),
  // manager: z.array(z.string()).optional(),
  // sales: z.array(z.string()).optional(),
  // support: z.array(z.string()).optional(),
  // developer: z.array(z.string()).optional(),
  // hrd: z.array(z.string()).optional(),
  // restricteduser: z.array(z.string()).optional(),
  // customer: z.array(z.string()).optional(),
  administrator: z.array(z.string()).optional(),
  manager: z.array(z.string()).optional(),
  sales: z.array(z.string()).optional(),
  // support: z.array(z.string()).optional(),
  developer: z.array(z.string()).optional(),
  hrd: z.array(z.string()).optional(),
  restricteduser: z.array(z.string()).optional(),
  customer: z.array(z.string()).optional(),

  // home: z.array(z.string()).optional(),
  Home: z.literal("Home").optional(),
  Orders: z.literal("Orders").optional(),
  DraftOrders: z.literal("Draft Orders").optional(),
  Products: z.literal("Product").optional(),
  GiftCards: z.literal("Gift Cards").optional(),
  Customers: z.literal("Customers").optional(),
  Reports: z.literal("Reports").optional(),
  Dashboards: z.literal("Dashboards").optional(),
  Marketing: z.literal("Marketing").optional(),
  Discounts: z.literal("Discounts").optional(),
  Apps: z.literal("Apps").optional(),
  Settings: z.literal("Settings").optional(),
  Theme: z.literal("Themes").optional(),
  BlogPostAndPages: z.literal("Blog posts and pages").optional(),
  Navigation: z.literal("Naviagtion").optional(),
  Domains: z.literal("Domains").optional(),
  ManageLocations: z.literal("Manage Locations").optional(),
});

// generate form types from zod validation schema
export type RolePermissionInput = z.infer<typeof rolePermissionSchema>;
