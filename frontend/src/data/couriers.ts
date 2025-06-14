import { CouriersField } from "../types/index";
export const couriers = [
  {
    id: 1,
    courierName: "postEx",
    image: "https://asaanretail.io/_next/static/media/Logo2.c90f6c79.svg",
  },
  {
    id: 2,
    courierName: "m_p",
    image: "https://asaanretail.io/_next/static/media/Logo4.d76db742.svg",
  },
  {
    id: 3,
    courierName: "leopards",
    image: "https://asaanretail.io/_next/static/media/Logo3.61758d4c.svg",
  },
  {
    id: 4,
    courierName: "trax",
    image: "https://asaanretail.io/_next/static/media/Logo1.fb58eaf7.svg",
  },
  {
    id: 5,
    courierName: "do_deliver",
    image: "https://asaanretail.io/_next/static/media/Logo11.68324591.svg",
  },
  {
    id: 6,
    courierName: "stead_fast",
    image: "https://asaanretail.io/_next/static/media/Logo10.91ad6b03.svg",
  },
  {
    id: 7,
    courierName: "tcs",
    image: "https://asaanretail.io/_next/static/media/Logo.858a6fdd.svg",
  },
  {
    id: 8,
    courierName: "blue_ex",
    image: "https://asaanretail.io/_next/static/media/Logo6.420e14c1.svg",
  },
];
export const couriersField: CouriersField = {
  //courier name must be same as in above array like courier[postEx] === couriersField[postEx]
  postEx: [{ name: "api", label: "API", fieldType: "text" }],
  m_p: [
    { name: "api", label: "API", fieldType: "text" },
    { name: "securityKey", label: "Security Key", fieldType: "text" },
  ],
  leopards: [
    { name: "api", label: "API", fieldType: "text" },
    { name: "password", label: "Password", fieldType: "password" },
  ],
  trax: [{ name: "api", label: "API", fieldType: "text" }],
  do_deliver: [
    { name: "api", label: "API", fieldType: "text" },
    { name: "securityKey", label: "Security Key", fieldType: "text" },
  ],
  stead_fast: [
    { name: "api", label: "API", fieldType: "text" },
    { name: "securityKey", label: "Security Key", fieldType: "text" },
  ],
  tcs: [
    { name: "api", label: "API", fieldType: "text" },
    { name: "securityKey", label: "Security Key", fieldType: "text" },
  ],
  blue_ex: [
    { name: "api", label: "API", fieldType: "text" },
    { name: "securityKey", label: "Security Key", fieldType: "text" },
  ],
};
