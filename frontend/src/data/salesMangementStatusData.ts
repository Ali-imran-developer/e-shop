
import { AiFillProduct, AiOutlineProduct } from "react-icons/ai";
import { IoCartOutline, IoCart } from "react-icons/io5";


export const salesManagementStatData = [
  {
    title: 'Public Orders',
    amount: 15786,
    increased: true,
    percentage: '32.40',
    icon: AiOutlineProduct,
  },
  {
    title: 'Private Orders',
    amount: 20129,
    increased: true,
    percentage: '40.29',
    icon: AiFillProduct,
  },
  {
    title: 'Public Products',
    amount: 8503,
    increased: false,
    percentage: '32.40',
    icon: IoCartOutline,
  },
  {
    title: 'Private Products',
    amount: 2430,
    increased: true,
    percentage: '32.40',
    icon: IoCart,
  },
];