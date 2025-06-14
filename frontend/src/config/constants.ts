export const CART_KEY = "isomorphic-cart";
export const POS_CART_KEY = "isomorphic-pos-cart";
export const DUMMY_ID = "FC6723757651DB74";
export const CHECKOUT = "isomorphic-checkout";
export const CURRENCY_CODE = "USD";
export const LOCALE = "en";
export const APP_NAME = "Shopilam";
export const COOKIE_SECRET = import.meta.env.VITE_COOKIE_SECRET;
export const APP_KEY = APP_NAME + "V" + COOKIE_SECRET;

export const CURRENCY_OPTIONS = {
  formation: "en-US",
  fractions: 2,
};

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: 5,
    name: "5",
  },
  {
    value: 10,
    name: "10",
  },
  {
    value: 15,
    name: "15",
  },
  {
    value: 20,
    name: "20",
  },
];

export const ROLES = {
  // Administrator: "Administrator",
  // Manager: "Manager",
  // Sales: "Sales",
  // Support: "Support",
  // Developer: "Developer",
  // HRD: "HR Department",
  // RestrictedUser: "Restricted User",
  // Customer: "Customer",
  Home: "Home",
  Orders: "Orders",
  DraftOrders: "Draft Orders",
  Products: "Product",
  GiftCards: "Gift Cards",
  Customers: "Customers",
  Reports: "Reports",
  Dashboards: "Dashboards",
  Marketing: "Marketing",
  Discounts: "Discounts",
  Apps: "Apps",
  Settings: "Settings",
  Theme: "Themes",
  BlogPostAndPages: "Blog posts and pages",
  Navigation: "Naviagtion",
  Domains: "Domains",
  ManageLocations: "Manage Locations",
} as const;
