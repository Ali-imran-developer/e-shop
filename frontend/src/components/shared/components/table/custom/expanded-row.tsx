import { PiXBold } from "react-icons/pi";
import { ActionIcon, Avatar, Button, Flex, Text, Title, Tooltip } from "rizzui";
import {
  ensureArray,
  sanitizePhone,
} from "@/utils/helperFunctions/formater-helper";
import SimpleBar from "simplebar-react";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import PencilIcon from "@/components/icons/pencil";
import Drawer from "./courierDrawer";
import { WhatsAppButton } from "@/components/shared/whatsAppButton";
import { useState } from "react";

const CustomExpandedComponent = ({
  table,
  row,
  selectedStatus,
  isLoading,
  handleStatusChange,
}: any) => {
  const [open, setOpen] = useState(false);
  const checkedItems = table && table?.getSelectedRowModel()?.rows?.map((row: any) => row?.original);

  return (
    <>
      <div className="grid grid-cols-2 px-[26px] dark:bg-gray-50 bg-white">
        <SimpleBar className="h-[250px] overflow-auto">
          <div className="">
            {ensureArray(row?.original?.products)?.map((item: any) => {
              return (
                <article
                  key={item?.productData?._id ?? ""}
                  className="flex items-center justify-between py-2 first-of-type:pt-2.5 last-of-type:pb-2.5 px-4"
                >
                  <div className="flex items-start">
                    <div className="w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Avatar
                        name={item?.productData?.name ?? ""}
                        src={item?.productData?.image ?? ""}
                      />
                    </div>
                    <header>
                      <Title as="h4" className="mb-0.5 text-sm font-medium">
                        {item?.productData?.name ?? ""}
                      </Title>
                      <Text className="text-xs text-gray-500">
                        Unit Price: Rs.{" "}
                        {formatNumberWithCommas(
                          Math.floor(item?.productData?.price)
                        )}
                      </Text>
                    </header>
                  </div>
                  <div
                    className={`flex max-w-xs items-end ${
                      Number(item?.productData?.stock) *
                        Number(item?.productData?.price) >
                      999
                        ? "gap-11"
                        : "gap-14"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Text className="font-semibold text-gray-800">
                        {item?.productData?.price ?? ""}
                      </Text>
                      <PiXBold size={13} className="text-gray-500" />
                      <Text className="font-semibold text-gray-800">
                        {item?.quantity ?? ""}
                      </Text>
                    </div>
                    <Text className="font-medium text-gray-900 dark:text-gray-700">
                      Rs.{" "}
                      {formatNumberWithCommas(
                        Number(item?.productData?.price ?? 0) *
                          Math.floor(Number(item?.quantity ?? 0))
                      )}
                    </Text>
                  </div>
                </article>
              );
            })}
          </div>
        </SimpleBar>
        <div className="bg-white border-l-[1px] border-l-gray-200 p-4">
          <div>
            <div className="flex items-center gap-3">
              <Title as="h3" className="text-base font-semibold sm:text-lg">
                Shipping Details
              </Title>
              <Tooltip
                size="sm"
                content="Edit Shipping Details"
                placement="top"
                color="invert"
              >
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  aria-label="View item"
                  className="cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <PencilIcon className="size-4 text-black" />
                </ActionIcon>
              </Tooltip>
            </div>
            <ul className="mt-4 grid gap-3 @3xl:mt-5">
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Name :</span>
                <span>{row?.original?.shipmentDetails?.name ?? ""}</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Email :</span>{" "}
                <span>{row?.original?.shipmentDetails?.email ?? ""}</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Address :</span>
                <span>{row?.original?.shipmentDetails?.address ?? ""}</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Phone :</span>
                <span>
                  {sanitizePhone(row?.original?.shipmentDetails?.phone ?? "")}
                </span>
                {row?.original?.shipmentDetails?.phone && (
                  <Tooltip
                    size="sm"
                    content="Send Message"
                    placement="top"
                    color="invert"
                  >
                    <ActionIcon
                      as="span"
                      size="sm"
                      variant="outline"
                      aria-label="send message"
                      className="cursor-pointer"
                    >
                      <WhatsAppButton
                        phoneNumber={row?.original?.shipmentDetails?.phone}
                        className="size-5"
                      />
                    </ActionIcon>
                  </Tooltip>
                )}
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">City :</span>{" "}
                <span>{row?.original?.shipmentDetails?.city ?? ""}</span>
              </li>
            </ul>
          </div>

          {checkedItems?.length < 2 && (
            <Flex className="mt-5">
              {selectedStatus?.buttons
                ?.filter((item: any) => item?.title)
                .map((item: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className={item.className}
                    color={item.color as any}
                    isLoading={isLoading === item.title}
                    onClick={() =>
                      handleStatusChange(checkedItems, item.title, row)
                    }
                  >
                    {item?.title}
                  </Button>
                ))}
            </Flex>
          )}
        </div>
      </div>

      <Drawer
        isDrawerOpen={open}
        closeDrawer={() => setOpen(false)}
        name={row?.original?.shipmentDetails?.name}
        address={row?.original?.shipmentDetails?.address}
        phone={row?.original?.shipmentDetails?.phone}
        city={row?.original?.shipmentDetails?.city}
        email={row?.original?.shipmentDetails?.email}
        row={row}
      />
    </>
  );
};

export default CustomExpandedComponent;
