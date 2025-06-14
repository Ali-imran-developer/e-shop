export interface Variant {
  id?: string;
  sku?: string;
  title?: string;
}

export interface Product {
  title: string;
  _id: string;
  storeId: string;
  images?: string;
  variants?: Variant[];
  mapped?: boolean | string;
}

export interface SelectedProductData {
  storeId: string;
  productId: string;
  variantId: string;
  sku: string;
}

export interface FormValues {
  productSku: string;
  productName: string;
  storeName: string;
  selectedProductData: SelectedProductData;
}

export interface DrawerProps {
  isDrawerOpen: boolean;
  data?: Product[];
  filteredData?: Product[];
  setFormDataHandler: (data: any) => void;
  row: {
    original: {
      storeId: string;
      _id: string;
    };
  };
  selectedVariant?: Variant;
  handleUpdate: () => void;
  closeDrawer: () => void;
}
