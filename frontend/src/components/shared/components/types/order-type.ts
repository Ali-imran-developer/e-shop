export interface OrderDataType {
  _id: string;
  storeId: string;
  shipperId: string | null;
  shopify_id: number;
  channelId: string;
  customerId: string;
  name: string;
  lineItems: {
    sku: string;
    quantity: number;
    name: string;
    price: number;
    image: string;
    vendor: string;
    weight: number;
  }[];
  financialStatus: string;
  fulfillmentStatus: string | null;
  tags: string[];
  pricing: {
    subTotal: number;
    currentTotalPrice: number;
    paid: number;
    balance: number;
    shipping: number;
    profit: number;
    taxPercentage: number;
    taxValue: number;
    extra: number | null;
    discount: number | null;
  };
  paymentMethod: string | null;
  shipmentDetails: {
    email: string;
    addresses: {
      company: string;
      address1: string;
      address2: string;
      city: string;
      province: string;
      country: string;
      zip: string;
      phone: string;
      name: string;
    }[];
  };
  tracking: string | null;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt: string | null;
  closedAt: string | null;
};
