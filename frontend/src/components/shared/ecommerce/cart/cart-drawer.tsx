import { useState } from "react";

import FloatingCartButton from "@shared/floating-cart-button";
import CartDrawerView from "@shared/ecommerce/cart/cart-drawer-view";
import { useParams, useLocation } from "react-router-dom";
import { routes } from "@/config/routes";
import { Drawer } from "rizzui";

export default function CartDrawer() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();

  // list of included pages
  const includedPaths: string[] = [
    routes.eCommerce.shop,
    routes.eCommerce.productDetails(params?.slug as string),
  ];

  const isPathIncluded = includedPaths.some((path) => pathname === path);

  // const {
  //   totalItems,
  //   items,
  //   removeItemFromCart,
  //   clearItemFromCart,
  //   total,
  //   addItemToCart,
  // } = useCart();
  return (
    <>
      {isPathIncluded ? (
        <FloatingCartButton
          onClick={() => setOpenDrawer(true)}
          className="top-1/2 -translate-y-1/2 bg-primary dark:bg-primary"
          totalItems={10}
        />
      ) : null}
      <Drawer
        isOpen={openDrawer ?? false}
        onClose={() => setOpenDrawer(false)}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
        containerClassName="dark:bg-gray-100"
        className="z-[9999]"
      >
        {/* <CartDrawerView
          setOpenDrawer={setOpenDrawer}
          clearItemFromCart={clearItemFromCart}
          removeItemFromCart={removeItemFromCart}
          addItemToCart={addItemToCart}
          items={items}
          total={total}
        /> */}
      </Drawer>
    </>
  );
}
