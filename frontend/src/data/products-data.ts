export type ProductType = {
  _id: string;
  name: string;
  category: string;
  image: any;
  sku: string;
  inventory: any;
  price: string;
  status: string;
  rating: number[];
  title?: string;
  stock: number;
  vendor: string;
  variants: string;
  channels: string;
  inventory_quantity: number;
};

export const productsData = [
  {
    id: "0o02051402",
    name: "Tasty Metal Shirt",
    category: "Books",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    sku: "52442",
    stock: 30,
    price: "410.00",
    status: "Pending",
    rating: [4, 5, 3, 2],
  },
  {
    id: "0o17477864",
    name: "Modern Gloves",
    category: "Kids",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/3.webp",
    sku: "98424",
    stock: 0,
    price: "340.00",
    status: "Draft",
    rating: [4, 5],
  },
  {
    id: "0o02374305",
    name: "Rustic Steel Computer",
    category: "Games",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
    sku: "78192",
    stock: 50,
    price: "948.00",
    status: "Draft",
    rating: [4, 5, 2, 5, 3],
  },
];
