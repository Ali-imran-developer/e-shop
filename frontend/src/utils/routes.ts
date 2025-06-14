import { routes } from "@/config/routes";
import { LazyExoticComponent, lazy } from "react";

type section = "auth" | "product" | "common";

export interface IRoute {
  name: string;
  section: section;
  route: string;
  component: LazyExoticComponent<(data: any) => JSX.Element>;
  protections?: "admin" | "token";
  sidebar?: boolean;
}

const allRoutes: IRoute[] = [
  {
    name: "Dashboard",
    section: "common",
    route: "/",
    component: lazy(() => import("../view/dashboard")),
    protections: "token",
    sidebar: true,
  },
  {
    name: "Login",
    section: "auth",
    route: "/login",
    component: lazy(() => import("../view/signIn")),
  },
  {
    name: "ForgetPassword",
    section: "auth",
    route: "/forgot-password",
    component: lazy(
      () => import("../view/forget-password/forget-password-form")
    ),
  },
  {
    name: "SignUP",
    section: "auth",
    route: "/sign-up",
    component: lazy(() => import("../view/signUp")),
  },
  {
    name: "forgotPassword",
    section: "auth",
    route: "/forgot-password",
    component: lazy(() => import("../view/forget-password")),
  },
  {
    name: "orders",
    section: "common",
    route: "/orders",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders")),
  },
  {
    name: "pickedUp",
    section: "common",
    route: "/picked-up",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/return")),
  },
  {
    name: "createCourier",
    section: "common",
    route: "/create-courier-management",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/couriers/create-courier")),
  },
  {
    name: "loadSheets",
    section: "common",
    route: "/load-sheets",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/load-sheet")),
  },
  {
    name: "createLoadSheet",
    section: "common",
    route: "/create-loadsheet",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/load-sheet/create-loadsheet")),
  },
  {
    name: "manualBooking",
    section: "common",
    route: "/manual-booking",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/manual-booking")),
  },
  {
    name: "ordersDetail",
    section: "common",
    route: "/orders/:id",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders/order-detail")),
  },
  {
    name: "dispatch",
    section: "common",
    route: "/dispatch",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/dispatch")),
  },
  {
    name: "listProducts",
    section: "common",
    route: "/list-products",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/resellers-product")),
  },
  {
    name: "tracking",
    section: "common",
    route: "/tracking/:id",
    component: lazy(() => import("../view/public-tracking-url")),
  },
  {
    name: "resellingProduct",
    section: "common",
    route: "/reselling-product",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/reselling-product")),
  },
  {
    name: "myOrders",
    section: "common",
    route: "/my-orders",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/my-orders")),
  },
  {
    name: "createResellingOrder",
    section: "common",
    route: "/reselling-orders",
    protections: "token",
    sidebar:true,
    component:lazy(()=>import("../view/reselling-orders"))
  },
  {
    name: "createResellingOrder",
    section: "common",
    route: "/create-reselling-order",
    protections: "token",
    sidebar:true,
    component:lazy(()=>import("../view/reselling-product/reselling-order/reselling-order"))
  },
  {
    name: "myResellers",
    section: "common",
    route: "/my-resellers",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/my-resellers")),
  },
  {
    name: "Procure",
    section: "common",
    route: "/procure",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/procure")),
  },
  {
    name: "orders",
    section: "common",
    route: "/create-orders",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/orders/create-order/create-order")),
  },
  {
    name: "products",
    section: "common",
    route: "/products",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/products")),
  },
  {
    name: "inventory",
    section: "common",
    route: "/inventory",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/inventory")),
  },
  {
    name: "create product",
    section: "common",
    route: "/create-products",
    protections: "token",
    sidebar: true,
    component: lazy(
      () => import("../view/products/create-products")
    ),
  },
  {
    name: "edit production",
    section: "common",
    route: "/products/:id/edit",
    protections: "token",
    sidebar: true,
    component: lazy(
      () => import("../view/products/create-products")
    ),
  },
  {
    name: "edit production",
    section: "common",
    route: "/create-orders/:id",
    protections: "token",
    sidebar: true,
    component: lazy(
      () => import("../view/orders/create-order/create-order")
    ),
  },
  {
    name: "myCouriers",
    section: "common",
    route: "/courier-management",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/couriers")),
  },
  {
    name: "personalInfo",
    section: "common",
    route: "/profile-settings",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/accountSetting")),
  },
  {
    name: "inventory",
    section: "common",
    route: "/stores/inventory",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/stores/inventory")),
  },
  {
    name: "skuMapping",
    section: "common",
    route: "/stores/sku-mapping",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/stores/sku-mapping")),
  },
  {
    name: "invoice",
    section: "common",
    route: "/billing",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/invoice")),
  },
  {
    name: "invoice",
    section: "common",
    route: "/invoice",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/invoice")),
  },
  {
    name: "invoiceID",
    section: "common",
    route: "/invoice/:id",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/invoice/details")),
  },
  {
    name: "salesManagement",
    section: "common",
    route: "/sales-management",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/salesManagement")),
  },
  {
    name: "shopifyConnection",
    section: "common",
    route: "/add-channels",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shopifyConnection")),
  },
  {
    name: "saleChannel",
    section: "common",
    route: "/sales-channel",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/saleChannel")),
  },
  {
    name: "/addShipperInfo",
    section: "common",
    route: "/add-shipper-info",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shipper-info/create-shipper-info")),
  },
  {
    name: "channelDetail",
    section: "common",
    route: "/edit-shipper-info",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shipper-info")),
  },
  {
    name: "customer",
    section: "common",
    route: "/customer",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/customer")),
  },
  {
    name: "rolesPermissions",
    section: "common",
    route: "/roles-permissions",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/roles-permission")),
  },
  {
    name: "shipperInfo",
    section: "common",
    route: "/shipper-info",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/shipper-info")),
  },
  {
    name: "reports",
    section: "common",
    route: "/reports",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/reports/index")),
  },
  {
    name: "reports",
    section: "common",
    route: "/reports/:link",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/reports/tables")),
  },
  {
    name: "questionnaire",
    section: "common",
    route: "/questionnaire",
    protections: "token",
    component: lazy(() => import("../view/multistep")),
  },
  {
    name: "testing",
    section: "common",
    route: "/testing",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/testing")),
  },
  {
    name: "purchaseOrder",
    section: "common",
    route: "/purchaseOrder",
    protections: "token",
    sidebar: true,
    component: lazy(() => import("../view/purchaseOrder")),
  },
  {
    name: "categories",
    section: "common",
    route: "/categories",
    sidebar: true,
    protections: "token",
    component: lazy(() => import("../view/categories")),
  },
  {
    name: "createCategories",
    section: "common",
    route: "/create-categories",
    sidebar: true,
    protections: "token",
    component: lazy(() => import("../view/categories/create-category")),
  },
];

export const getRoutes = (
  type: "unprotected" | "tokenProtected" | "adminProtected"
): IRoute[] => {
  switch (type) {
    case "unprotected":
      return allRoutes.filter((el) => !el?.protections?.length);
    case "tokenProtected":
      return allRoutes.filter((el) => el?.protections?.includes("token"));
    case "adminProtected":
      return allRoutes.filter((el) => el?.protections?.includes("admin"));
    default:
      return allRoutes;
  }
};
