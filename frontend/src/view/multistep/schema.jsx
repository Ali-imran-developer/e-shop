import ShopifyIcon from "@/components/shared/components/icons/shopify";
import WooCommerce from "@/components/shared/components/icons/woocomerece";
import DarazIcon from "@/components/shared/components/icons/daraz";
import FacebookIcon from "@/components/shared/components/icons/facebook";
import Whatsapp from "@/components/shared/components/icons/whatsapp";
import TiktokIcon from "@/components/shared/components/icons/tiktok";
import OtherIcon from "@/components/shared/components/icons/other";
import DropshipIcon from "@/components/shared/components/icons/dropship";
import ImportIcon from "@/components/shared/components/icons/import";
import LocalSourcingIcon from "@/components/shared/components/icons/local-sourcing";
import ManufacturingIcon from "@/components/shared/components/icons/manufacturing";
import OthersIcon from "@/components/shared/components/icons/other";
import MarkazIcon from "@/components/shared/components/icons/markaz";
import HHCIcon from "@/components/shared/components/icons/hhc";

export const schema = {
  currentlySelling: {
    question: "Are you currently selling online?",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
  sellingChannels: {
    question: "What channels do you use for selling?",
    options: [
      {
        value: "Shopify",
        label: "Shopify",
        icon: <ShopifyIcon className="h-8 w-8" />,
      },
      {
        value: "WooCommerce",
        label: "WooCommerce",
        icon: <WooCommerce className="h-8 w-8" />,
      },
      {
        value: "Daraz",
        label: "Daraz",
        icon: <DarazIcon className="h-14 w-14" />,
      },
      {
        value: "Facebook",
        label: "Facebook",
        icon: <FacebookIcon className="h-8 w-8" />,
      },
      {
        value: "WhatsApp",
        label: "WhatsApp",
        icon: <Whatsapp className="h-14 w-14" />,
      },
      {
        value: "TikTok",
        label: "TikTok",
        icon: <TiktokIcon className="h-14 w-14" />,
      },
      {
        value: "Others",
        label: "Others",
        icon: <OtherIcon className="h-14 w-14" />,
      },
    ],
  },
  salesChannel: {
    question: "Do you have more than one sales channel?",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
  products: {
    question: "How do you source the products?",
    options: [
      {
        value: "Manufacturing ",
        label: "Manufacturing ",
        icon: <ManufacturingIcon className="h-8 w-8" />,
      },
      {
        value: "Import",
        label: "Import",
        icon: <ImportIcon className="h-14 w-14" />,
      },
      {
        value: "Local Sourcing",
        label: "Local Sourcing",
        icon: <LocalSourcingIcon className="h-8 w-8" />,
      },
      {
        value: "Dropship",
        label: "Dropship",
        icon: <DropshipIcon className="h-14 w-14" />,
      },
    ],
  },
  inventory: {
    question: "How do you currently manage your inventory and order fulfillment?",
    options: [
      {
        value: 'Google Sheets',
        label: 'Google Sheets',
      },
      {
        value: 'inventory management system',
        label: 'An inventory management system',
      },
      {
        value: 'Others',
        label: 'Others: ____________',
      },
    ],
  },
  resellersProducts: {
    question:
      "Do you currently have resellers for your products?",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
  },
  resellersOperate: {
    question: "Where do your resellers operate?",
    options: [
      {
        value: "Own resellers",
        label: "Own resellers",
        icon: <ShopifyIcon className="h-8 w-8" />,
      },
      {
        value: "Markaz",
        label: "Markaz",
        icon: <MarkazIcon className="h-8 w-8" />,
      },
      {
        value: "Daraz",
        label: "Daraz",
        icon: <DarazIcon className="h-14 w-14" />,
      },
      {
        value: "HHC",
        label: "HHC",
        icon: <HHCIcon className="h-14 w-14" />,
      },
      {
        value: "Others",
        label: "Others:",
        icon: <OthersIcon className="h-14 w-14" />,
      },
    ],
  },
  manageResellers: {
    question:
      "How do you currently manage your resellers?",
    options: [
      {
        value: 'Google Sheets',
        label: 'Google Sheets',
      },
      {
        value: 'Online CRM',
        label: 'Online CRM',
      },
      {
        value: 'Others',
        label: 'Others',
      },
    ],
  },
  primaryChallenge: {
    question: "What’s your primary challenge in starting online sales?",
    options: [
      {
        value: "Lack of products",
        label: "Lack of products",
      },
      {
        value: "Lack of knowledge about e-commerce platforms",
        label: "Lack of knowledge about e-commerce platforms",
      },
      {
        value: "No time to manage online business",
        label: "No time to manage online business",
      },
      {
        value: "Unsure about fulfillment/logistics",
        label: "Unsure about fulfillment/logistics",
      },
      {
        value: "Other",
        label: "Other: ____________",
      },
    ],
  },
  sellProducts: {
    question: "Do you have products you can sell?",
    options: [
      {
        value: "yes, I have a few plans",
        label: 'Yes, I have a few plans',
      },
      {
        value: "no, I am looking for options",
        label: 'No, I am looking for options',
      },
    ],
  },
  viaDropshipping: {
    question: "Are you interested in selling products via dropshipping?",
    options: [
      {
        value: 'yes',
        label: 'Yes',
      },
      {
        value: 'no',
        label: 'No',
      },
      {
        value: 'Im not sure',
        label: "I'm not sure",
      },
    ],
  },
  hearAboutShopilam: {
    question:
      "How did you hear about Shopilam?",
    options: [
      { value: "I was contacted directly", label: "I was contacted directly" },
      { value: "Google search", label: "Google search" },
      { value: "Facebook/Instagram", label: "Facebook/Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "A friend referred me", label: "A friend referred me" },
      {
        value: "My vendor/reseller referred me",
        label: "My vendor/reseller referred me",
      },
      {
        value: "I'm using other Shopilam products",
        label: "I'm using other Shopilam products",
      },
    ],
  },
};
