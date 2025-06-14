import { CouponType } from "../config/enums";

export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export type ProductColor = {
  name?: string;
  code?: string;
};

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
}

export type Product = {
  image: any;
  id: number;
  slug?: string;
  title: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail: string;
  colors?: ProductColor[];
  sizes?: number[];
};

export type PosProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount?: number;
};
export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

export interface FlightingCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  meta?: {
    model: string;
    hours: string;
    stop: string;
  };
  class: string;
  bucket: {
    luggage?: string;
    bag?: string;
  };
  airlines?: string;
  routes?: {
    arrivalDate: Date | string;
    arrivalTime: Date | string;
    departureDate: Date | string;
    departureTime: Date | string;
    departureCityCode: string;
    departureCity: string;
    departureTerminal: string;
    arrivalCityCode: string;
    arrivalCity: string;
    arrivalTerminal: string;
    layover: {
      layoverCityCode: string;
      layoverCity: string;
      layoverTerminal: string;
      layoverTime: string;
    }[];
  };
  cheapest?: boolean;
  best?: boolean;
  quickest?: boolean;
}

export type LayoverAirPortOptionType = {
  id: number;
  name: string;
  isGroupTitle?: boolean;
  checked?: boolean;
  disabled?: boolean;
};

export type TanTableProductsDataType = {
  id: string;
  title: string;
  name: string;
  imageId: any;
  category: string;
  image: string;
  price: number;
  quantity: number;
  position?: number;
  sku?: string;
  stock: {
    available: number,
  };
};

export type UserLogin = {
  accessToken: string;
  user: {};
};
export type Login = {
  email: string;
  password: string;
};
export type Field = {
  name: string;
  label: string;
  fieldType: any;
};
export type CouriersField = {
  postEx: Field[];
  m_p: Field[];
  leopards: Field[];
  trax: Field[];
  do_deliver: Field[];
  stead_fast: Field[];
  tcs: Field[];
  blue_ex: Field[];
  // do_deliver: Field[];
};
export type CreateRoles = {
  name: string;
  permissions: string[];
};
