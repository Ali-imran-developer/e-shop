import React from "react";
import { Link } from "react-router-dom";
import { routes } from "@/config/routes";
import {
  PiGearSix,
  PiSquareHalf,
  PiDotOutline,
  PiX,
  PiCross,
} from "react-icons/pi";
import cn from "@utils/helperFunctions/class-names";
import { BsCrosshair2 } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

interface DropdownItem {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  dropdownItems?: DropdownItem[];
}

interface SettingsDrawerProps {
  onClose: () => void;
  show: boolean;
}

const NestedDropdown = ({
  item,
  level = 0,
  onRouteClick,
}: {
  item: DropdownItem;
  level?: number;
  onRouteClick: () => void;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    if (item.dropdownItems) {
      setIsOpen(!isOpen);
    }
  };

  const handleRouteClick = (e: React.MouseEvent) => {
    onRouteClick();
  };

  const isSubItem = level > 0;

  return (
    <div className="relative">
      {item.href ? (
        <Link
          to={item.href}
          onClick={handleRouteClick}
          className={`flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full ${
            isSubItem ? "text-gray-600 dark:text-gray-400 text-sm" : ""
          }`}
        >
          <div className="flex items-center w-full">
            {isSubItem && <PiDotOutline className="w-4 h-4 mr-1" />}
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span>{item.name}</span>
          </div>
        </Link>
      ) : (
        <button
          onClick={toggleDropdown}
          className={`flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full ${
            isSubItem ? "text-gray-600 dark:text-gray-400 text-sm" : ""
          }`}
        >
          <div className="flex items-center">
            {item.icon && (
              <span className="mr-2 font-semibold">{item.icon}</span>
            )}
            <span className="font-semibold">{item.name}</span>
          </div>
          {item.dropdownItems && (
            <svg
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
      )}

      {isOpen && item.dropdownItems && (
        <div className="pl-4 mt-1 border-l border-gray-200 dark:border-gray-600">
          {item.dropdownItems.map((dropdownItem, index) => (
            <NestedDropdown
              key={index}
              item={dropdownItem}
              level={level + 1}
              onRouteClick={onRouteClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function SettingsDrawer({ onClose, show }: SettingsDrawerProps) {
  const settingsData = {
    name: "Settings",
    icon: <PiGearSix />,
    dropdownItems: [
      {
        name: "Channels",
        icon: <PiSquareHalf />,
        dropdownItems: [
          {
            name: "Shopify",
            // href: "routes.settings.channels.shopify",
          },
          {
            name: "Shopilam",
            // href: "routes.settings.channels.shopilam",
          },
          {
            name: "Whatsapp",
            // href: "routes.settings.channels.whatsapp",
          },
        ],
      },
      {
        name: "Couriers",
        icon: <PiSquareHalf />,
        dropdownItems: [
          {
            name: "Courier Management",
            href: routes.settings.couriers.courierManagement,
          },
          {
            name: "Booking Cities",
            href: routes.settings.couriers.bookingCities,
          },
        ],
      },
      {
        name: "Users & Permissions",
        href: routes.settings.userPermissions,
      },
      {
        name: "Sales Management",
        href: routes.salesManagement,
      },
    ],
  };

  const drawerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className={cn("absolute", show ? "bg-opacity-75" : "bg-opacity-0")}
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed bottom-[120px] left-0 flex">
            <div
              ref={drawerRef}
              className={cn(
                "pointer-events-auto w-[220px] min-h-[100px] max-h-[70vh] overflow-auto bg-gray-50 rounded-tr-xl border border-gray-300 shadow-xl",
                "transform transition-transform duration-[1000ms] ease-in-out",
                show ? "animate-drawerOpen" : "translate-y-full"
              )}
            >
              <div className="p-4">
                <div className="space-y-1">
                  {settingsData.dropdownItems.map((item, index) => (
                    <NestedDropdown
                      key={index}
                      item={item}
                      onRouteClick={onClose}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
