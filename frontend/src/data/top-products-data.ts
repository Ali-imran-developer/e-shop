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
  vendor?: string;
  thumbnail?: string;
};

export const topProducts = [
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
    title: "Black Nigga",
    thumbnail: "Black Nigga",
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
    title: "Beautiful Purse",
    thumbnail: "Beautiful Purse",
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
    title: "Branded Watch",
    thumbnail: "Branded Watch",
  },
  {
    id: "0o02602714",
    name: "Licensed Concrete Cheese",
    category: "Electronics",
    image:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/11.webp",
    sku: "86229",
    stock: 0,
    price: "853.00",
    status: "Pending",
    rating: [3, 2],
    title: "Red Lipstick",
    thumbnail: "Red Lipstick",
  },
];
