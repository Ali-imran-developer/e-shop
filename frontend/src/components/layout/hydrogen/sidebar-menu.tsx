import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Title, Collapse } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { PiCaretDownBold } from "react-icons/pi";
import { menuItems } from "@layouts/hydrogen/menu-items";
import StatusBadge from "@shared/components/get-status-badge";
import { Link } from "react-router-dom";

export function SidebarMenu() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="mt-4 pb-3 3xl:mt-6">
      {menuItems.map((item: any, index) => {
        const isActive = pathname === (item?.href as string);
        const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
          (dropdownItem: any) => dropdownItem.href === pathname
        );
        const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

        return (
          <Fragment key={item.name + "-" + index}>
            {item?.href ? (
              <>
                {item?.dropdownItems ? (
                  item?.dropdownItems[2]?.dropdownItems ||
                  item?.dropdownItems[0]?.dropdownItems ||
                  item?.dropdownItems[1]?.dropdownItems ? (
                    <Collapse
                      defaultOpen={isDropdownOpen}
                      header={({ open, toggle }) => (
                        <div
                          onClick={toggle}
                          className={cn(
                            "group relative overflow-y-auto mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                            isDropdownOpen
                              ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                              : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700"
                          )}
                        >
                          <span className="flex items-center">
                            {item?.icon && (
                              <span
                                className={cn(
                                  "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                  isDropdownOpen
                                    ? "text-primary"
                                    : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                                )}
                              >
                                {item?.icon}
                              </span>
                            )}
                            {item.name}
                          </span>

                          <PiCaretDownBold
                            strokeWidth={3}
                            className={cn(
                              "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                              open && "rotate-0 rtl:rotate-0"
                            )}
                          />
                        </div>
                      )}
                    >
                      {item?.dropdownItems?.map(
                        (dropdownItem: any, index: number) =>
                          dropdownItem?.dropdownItems ? (
                            <Collapse
                              key={dropdownItem?.name + index}
                              defaultOpen={isDropdownOpen}
                              header={({ open, toggle }) => (
                                <div
                                  onClick={toggle}
                                  className={cn(
                                    "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                                    isDropdownOpen
                                      ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                                      : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700"
                                  )}
                                >
                                  <span className="flex items-center ml-4">
                                    {dropdownItem?.icon && (
                                      <span
                                        className={cn(
                                          "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                          isDropdownOpen
                                            ? "text-primary"
                                            : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                                        )}
                                      >
                                        {dropdownItem?.icon}
                                      </span>
                                    )}
                                    {dropdownItem.name}
                                  </span>

                                  <PiCaretDownBold
                                    strokeWidth={3}
                                    className={cn(
                                      "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                      open && "rotate-0 rtl:rotate-0"
                                    )}
                                  />
                                </div>
                              )}
                            >
                              {dropdownItem?.dropdownItems?.map(
                                (dropdownItem: any, index: number) =>
                                  dropdownItem?.dropdownItems ? (
                                    <Collapse
                                      key={dropdownItem?.name + index}
                                      defaultOpen={isDropdownOpen}
                                      header={({ open, toggle }) => (
                                        <div
                                          onClick={toggle}
                                          className={cn(
                                            "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                                            isDropdownOpen
                                              ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                                              : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700"
                                          )}
                                        >
                                          <span className="flex items-center ml-9">
                                            {dropdownItem?.icon && (
                                              <span
                                                className={cn(
                                                  "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                                  isDropdownOpen
                                                    ? "text-primary"
                                                    : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                                                )}
                                              >
                                                {dropdownItem?.icon}
                                              </span>
                                            )}
                                            {dropdownItem.name}
                                          </span>

                                          <PiCaretDownBold
                                            strokeWidth={3}
                                            className={cn(
                                              "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                                              open && "rotate-0 rtl:rotate-0"
                                            )}
                                          />
                                        </div>
                                      )}
                                    >
                                      {dropdownItem?.dropdownItems?.map(
                                        (dropdownItem: any, index: number) => {
                                          const isChildActive =
                                            pathname ===
                                            (dropdownItem?.href as string);

                                          return (
                                            <Link
                                              to={dropdownItem?.href}
                                              key={dropdownItem?.name + index}
                                              className={cn(
                                                "mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                                                isChildActive
                                                  ? "text-primary"
                                                  : "text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                                              )}
                                            >
                                              <div className="flex items-center truncate ml-12">
                                                <span
                                                  className={cn(
                                                    "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                                    isChildActive
                                                      ? "bg-primary ring-[1px] ring-primary"
                                                      : "opacity-40"
                                                  )}
                                                />{" "}
                                                <span className="truncate">
                                                  {dropdownItem?.name}
                                                </span>
                                              </div>
                                              {dropdownItem?.badge?.length ? (
                                                <StatusBadge
                                                  status={dropdownItem?.badge}
                                                />
                                              ) : null}
                                            </Link>
                                          );
                                        }
                                      )}
                                    </Collapse>
                                  ) : (
                                    <Link
                                      to={dropdownItem?.href}
                                      key={dropdownItem?.name + index}
                                      className={cn(
                                        "mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                                        pathname ===
                                          (dropdownItem?.href as string)
                                          ? "text-primary"
                                          : "text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                                      )}
                                    >
                                      <div className="flex items-center truncate ml-8">
                                        <span
                                          className={cn(
                                            "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                            pathname ===
                                              (dropdownItem?.href as string)
                                              ? "bg-primary ring-[1px] ring-primary"
                                              : "opacity-40"
                                          )}
                                        />{" "}
                                        <span className="truncate">
                                          {dropdownItem?.name}
                                        </span>
                                      </div>
                                      {dropdownItem?.badge?.length ? (
                                        <StatusBadge
                                          status={dropdownItem?.badge}
                                        />
                                      ) : null}
                                    </Link>
                                  )
                              )}
                            </Collapse>
                          ) : (
                            <Link
                              to={dropdownItem?.href}
                              key={dropdownItem?.name + index}
                              className={cn(
                                "mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                                pathname === (dropdownItem?.href as string)
                                  ? "text-primary"
                                  : "text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                              )}
                            >
                              <div className="flex items-center truncate ml-4">
                                <span
                                  className={cn(
                                    "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                    pathname === (dropdownItem?.href as string)
                                      ? "bg-primary ring-[1px] ring-primary"
                                      : "opacity-40"
                                  )}
                                />{" "}
                                <span className="truncate">
                                  {dropdownItem?.name}
                                </span>
                              </div>
                              {dropdownItem?.badge?.length ? (
                                <StatusBadge status={dropdownItem?.badge} />
                              ) : null}
                            </Link>
                          )
                      )}
                    </Collapse>
                  ) : (
                    <Collapse
                      defaultOpen={isDropdownOpen}
                      header={({ open, toggle }) => (
                        <div
                          onClick={toggle}
                          className={cn(
                            "group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                            isDropdownOpen
                              ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                              : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700"
                          )}
                        >
                          <span className="flex items-center">
                            {item?.icon && (
                              <span
                                className={cn(
                                  "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                                  isDropdownOpen
                                    ? "text-primary"
                                    : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                                )}
                              >
                                {item?.icon}
                              </span>
                            )}
                            {item.name}
                          </span>

                          <PiCaretDownBold
                            strokeWidth={3}
                            className={cn(
                              "h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90",
                              open && "rotate-0 rtl:rotate-0"
                            )}
                          />
                        </div>
                      )}
                    >
                      {item?.dropdownItems?.map(
                        (dropdownItem: any, index: number) => {
                          const isChildActive =
                            pathname === (dropdownItem?.href as string);

                          return (
                            <Link
                              to={dropdownItem?.href}
                              key={dropdownItem?.name + index}
                              className={cn(
                                "mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5",
                                isChildActive
                                  ? "text-primary"
                                  : "text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
                              )}
                            >
                              <div className="flex items-center truncate">
                                <span
                                  className={cn(
                                    "me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200",
                                    isChildActive
                                      ? "bg-primary ring-[1px] ring-primary"
                                      : "opacity-40"
                                  )}
                                />{" "}
                                <span className="truncate">
                                  {dropdownItem?.name}
                                </span>
                              </div>
                              {dropdownItem?.badge?.length ? (
                                <StatusBadge status={dropdownItem?.badge} />
                              ) : null}
                            </Link>
                          );
                        }
                      )}
                    </Collapse>
                  )
                ) : (
                  <Link
                    to={item?.href}
                    className={cn(
                      "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                      isActive
                        ? "before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                        : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
                    )}
                  >
                    <div className="flex items-center truncate">
                      {item?.icon && (
                        <span
                          className={cn(
                            "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]",
                            isActive
                              ? "text-primary"
                              : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                          )}
                        >
                          {item?.icon}
                        </span>
                      )}
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item?.badge?.length ? (
                      <StatusBadge status={item?.badge} />
                    ) : null}
                  </Link>
                )}
              </>
            ) : (
              <Title
                as="h6"
                className={cn(
                  "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
                  index !== 0 && "mt-6 3xl:mt-7"
                )}
              >
                {item.name}
              </Title>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
