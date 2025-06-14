import HamburgerButton from "@layouts/hamburger-button";
import Sidebar from "@layouts/hydrogen/sidebar";
import Logo from "@shared/components/logo";
import HeaderMenuRight from "@layouts/header-menu-right";
import StickyHeader from "@layouts/sticky-header";
import { Link } from "react-router-dom";
import SearchWidget from "@shared/search/search";
import { ActionIcon, Badge, Tooltip } from "rizzui";
import { useState } from "react";
import SidebarDrawer from "./courierDrawer";
import CartIcon from "@/components/shared/components/icons/carticon";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDrawerClose = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8 4xl:px-10">
        <div className="flex w-full items-center">
          <HamburgerButton onClick={() => setSidebarOpen(true)} />
          <Link
            to={"/"}
            aria-label="Site Logo"
            className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
          >
            {/* <Logo iconOnly={true} /> */}
          </Link>
          <SearchWidget />
        </div>

        <Link to={"/orders"}>
          <Tooltip
            size="sm"
            content="New Orders"
            placement="top"
            color="invert"
          >
            <ActionIcon
              aria-label="New Orders"
              variant="text"
              className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9 mr-4"
            >
              {/* <Badge
                // color="invert"
                className="font-semibold pb-6 text-red text-base absolute right-1 top-1.5 -translate-y-1/3 translate-x-1/2"
              >
                3
              </Badge> */}
              <CartIcon />
            </ActionIcon>
          </Tooltip>
        </Link>
        <HeaderMenuRight />
      </StickyHeader>

      <SidebarDrawer
        isDrawerOpen={sidebarOpen}
        closeDrawer={handleDrawerClose}
      />
    </>
  );
}
