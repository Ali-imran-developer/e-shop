export interface Product {
  id: string;
  name: string;
  email: string;
  quantity: number;
  price: number;
  image: string;
}
export interface testOrderDataTypes {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  avatar: string;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
  products?: Product[];
}

export const testOrderData = [
  {
    id: "3413",
    name: "Dr. Ernest Fritsch-Shanahan",
    email: "August17@hotmail.com",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-15.webp",
    items: 83,
    price: "457.00",
    status: "Cancelled",
    createdAt: "2024-12-06T00:01:51.735Z",
    updatedAt: "2024-12-01T00:01:51.735Z",
    products: [
      {
        id: "0o02051402",
        name: "Tasty Metal Shirt",
        category: "Shoes",
        image:
          "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
        price: "410.00",
        quantity: 2,
      },
    ],
  },
  {
    id: "9192",
    name: "Mr. Gregory Medhurst-Lubowitz",
    email: "General.Bergstrom@yahoo.com",
    avatar:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-14.webp",
    items: 21,
    price: "426.00",
    status: "Cancelled",
    createdAt: "2023-07-22T10:53:43.612Z",
    updatedAt: "2024-11-30T08:39:41.230Z",
    products: [
      {
        id: "0o24033230",
        name: "Gorgeous Bronze Gloves",
        category: "Watch",
        image:
          "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/1.webp",
        price: "948.00",
        quantity: 1,
      },
    ],
  },
];
