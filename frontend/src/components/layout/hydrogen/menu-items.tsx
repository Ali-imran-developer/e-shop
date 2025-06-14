import { routes } from "@config/routes";
import { PiHouse, PiBasket, PiSquaresFour, PiUsers, PiGearSix, PiMoney } from "react-icons/pi";

export const menuItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: <PiHouse className="w-5 h-5" />,
  },
  {
    name: "Orders",
    href: "#",
    icon: <PiBasket className="w-5 h-5"/>,
    dropdownItems: [
      {
        name: "New Orders",
        href: routes.orders.orders,
      },
      {
        name: "Dispatch",
        href: routes.orders.dispatch,
      },
      {
        name: "Shipper Info",
        href: routes.orders.shipperInfo,
      },
    ],
  },
  {
    name: "All Products",
    href: "#",
    icon: <PiSquaresFour className="w-5 h-5"/>,
    dropdownItems: [
      { name: "All Products", href: routes.products.products },
      { name: "Categories", href: routes.products.categories },
    ],
  },
  {
    name: "Payments",
    href: "#",
    icon: <PiMoney className="w-5 h-5"/>,
    dropdownItems: [
      { name: "Dashboard", href: routes.payments.dashboard },
      {
        name: "History",
        href: "",
        dropdownItems: [
          {
            name: "View Details",
            href: "View Details",
            dropdownItems: [
              {
                name: "Print",
                href: routes.payments.history.viewDetails.print,
              },
            ],
          },
          { name: "Dispute", href: routes.payments.history.dispute },
        ],
      },
    ],
  },
  {
    name: "Customer",
    href: routes.customer,
    icon: <PiUsers className="w-5 h-5"/>,
  },
  {
    name: "Settings",
    href: "#",
    icon: <PiGearSix className="w-5 h-5"/>,
    dropdownItems: [
      {
        name: "Couriers",
        href: routes.settings.couriers.courierManagement,
      },
      {
        name: "Channels",
        href: routes.settings.stores.channels,
      },
    ],
  },
];
