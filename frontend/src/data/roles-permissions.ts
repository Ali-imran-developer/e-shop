import { ROLES } from "@config/constants";
import { avatarIds } from "@utils/helperFunctions/get-avatar";
import { getRandomArrayElement } from "@utils/helperFunctions/get-random-array-element";

export const users = [
  {
    id: 1,
    role: ROLES.Home,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 2,
    role: ROLES.Home,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 3,
    role: ROLES.Home,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 4,
    role: ROLES.Home,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 5,
    role: ROLES.Home,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
  {
    id: 6,
    role: ROLES.Home,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
  },
];

export const rolesList = [
  {
    name: ROLES.Home,
    color: "#2465FF",
    users,
  },
  {
    name: ROLES.Orders,
    color: "#F5A623",
    users,
  },
  {
    name: ROLES.DraftOrders,
    color: "#FF1A1A",
    users,
  },

  {
    name: ROLES.Products,
    color: "#FF1A1A",
    users,
  },
  {
    name: ROLES.GiftCards,
    color: "#11A849",
    users,
  },
  {
    name: ROLES.Customers,
    color: "#4E36F5",
    users,
  },
  {
    name: ROLES.Reports,
    color: "#0070F3",
    users,
  },
  {
    name: ROLES.Dashboards,
    color: "#2465FF",
    users,
  },
  {
    name: ROLES.Marketing,
    color: "#F5A623",
    users,
  },
  {
    name: ROLES.Discounts,
    color: "#FF1A1A",
    users,
  },
  {
    name: ROLES.Apps,
    color: "#8A63D2",
    users,
  },
  {
    name: ROLES.Settings,
    color: "#FF1A1A",
    users,
  },
  {
    name: ROLES.Theme,
    color: "#11A849",
    users,
  },
  {
    name: ROLES.BlogPostAndPages,
    color: "#4E36F5",
    users,
  },
  {
    name: ROLES.Navigation,
    color: "#0070F3",
    users,
  },
  {
    name: ROLES.Domains,
    color: "#2465FF",
    users,
  },
  {
    name: ROLES.ManageLocations,
    color: "#F5A623",
    users,
  },
];

export const roleActions = [
  {
    id: 1,
    name: "Add User",
  },
  {
    id: 2,
    name: "Rename",
  },
  {
    id: 3,
    name: "Remove Role",
  },
];
