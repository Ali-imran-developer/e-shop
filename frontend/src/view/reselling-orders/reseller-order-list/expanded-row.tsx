import PencilIcon from "@/components/icons/pencil";
// import CourierDrawer from "./courierDrawer";
import { TanTableProductsDataType } from "@/types";
import TableAvatar from "@ui/avatar-card";
import { useEffect, useState } from "react";
import { PiWhatsappLogo, PiXBold } from "react-icons/pi";
import { ActionIcon, Button, Flex, Text, Title, Tooltip } from "rizzui";
import {
  ensureArray,
  sanitizePhone,
} from "@/utils/helperFunctions/formater-helper";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { WhatsAppButton } from "@/components/shared/whatsAppButton";

const CustomExpandedComponent = ({
  table,
  row,
  data,
  selectedStatus,
  handleStatusChange,
  isLoading,
}: any) => {
  const checkedItems =
    table && table?.getSelectedRowModel?.rows?.map((row: any) => row?.original);
  const [shippingDetails, setShippingDetails] = useState({
    name: row?.original?.shipmentDetails?.addresses[0]?.name || "",
    address1: row?.original?.shipmentDetails?.addresses[0]?.address1 || "",
    phone: row?.original?.shipmentDetails?.addresses[0]?.phone || "",
    city: row?.original?.shipmentDetails?.addresses[0]?.city?.city || "",
  });
  const products = row?.original?.line_items || {};
  const updateShippingDetails = (updatedData: any) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedData,
    }));
  };
  const { name, address1, phone, city } = shippingDetails;
  const [isDrawerOpen, setIsDrawerOpen] = useState({ status: false, type: "" });
  const handleDrawerClose = () => {
    setIsDrawerOpen({ status: false, type: "" });
  };
  const handleDrawerOpen = (val: any) => {
    setIsDrawerOpen(val);
  };
  const courierLabel = row?.original?.courier?.label;

  return (
    <>
      <div className="grid grid-cols-2 px-[26px] dark:bg-gray-50 bg-white">
        <SimpleBar className="h-[250px] overflow-auto">
          <div className="">
            {row?.original?.lineItems?.map(
              (product: TanTableProductsDataType) => (
                <article
                  key={product.title}
                  className="flex items-center justify-between py-2 first-of-type:pt-2.5 last-of-type:pb-2.5 px-4"
                >
                  <div className="flex items-start">
                    <div className="w-12 flex-shrink-0 overflow-hidden rounded-full">
                      {/* <img
                      className="object-cover"
                      src={product?.image || "./assets/images/unavailable.png"}
                      alt={product?.name || "N/A"}
                    /> */}
                      <TableAvatar
                        name={product?.name || ""}
                        src={product?.image}
                      />
                    </div>
                    <header>
                      <Title as="h4" className="mb-0.5 text-sm font-medium">
                        {product.name}
                      </Title>
                      <Text className="mb-1 text-gray-500">
                        {product?.category}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        Unit Price: Rs.{" "}
                        {formatNumberWithCommas(Math.floor(product?.price))}
                      </Text>
                    </header>
                  </div>
                  <div
                    className={`flex max-w-xs items-end ${
                      Number(product?.quantity) * Number(product?.price) > 999
                        ? "gap-11"
                        : "gap-14"
                    }`}
                  >
                    <div className="flex items-center">
                      <PiXBold size={13} className="me-1 text-gray-500" />
                      <Text
                        as="span"
                        className="font-medium text-gray-900 dark:text-gray-700"
                      >
                        {product?.quantity}
                      </Text>
                    </div>
                    <Text className="font-medium text-gray-900 dark:text-gray-700">
                      Rs.{" "}
                      {formatNumberWithCommas(
                        Number(product?.quantity ?? 0) *
                          Math.floor(Number(product?.price ?? 0))
                      )}
                    </Text>
                  </div>
                </article>
              )
            )}
          </div>
        </SimpleBar>
        <div className="bg-white border-l-[1px] border-l-gray-200 p-4">
          <div>
            <Flex>
              <Title as="h3" className="text-base font-semibold sm:text-lg">
                Shipping Details
              </Title>

              {selectedStatus.label !== "Booked" && (
                <Tooltip
                  size="sm"
                  content="Edit Details"
                  placement="top"
                  color="invert"
                >
                  <ActionIcon
                    as="span"
                    size="sm"
                    variant="outline"
                    aria-label="Edit Item"
                    className="cursor-pointer"
                    onClick={() =>
                      handleDrawerOpen({ status: true, type: "inputs" })
                    }
                  >
                    <PencilIcon className="size-4" />
                  </ActionIcon>
                </Tooltip>
              )}
            </Flex>
            <ul className="mt-4 grid gap-3 @3xl:mt-5">
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Name :</span>
                <span>{name}</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Address :</span>
                <span>{address1}</span>
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">Phone :</span>
                <span>{sanitizePhone(phone)}</span>
                {phone && (
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
                      <WhatsAppButton phoneNumber={phone} className="size-5" />
                    </ActionIcon>
                  </Tooltip>
                )}
              </li>
              <li className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">City :</span>{" "}
                <span>{city}</span>
              </li>
            </ul>
          </div>

          {/* {checkedItems?.length !== 2 && ( */}
          {ensureArray(checkedItems)?.length < 2 && (
            <Flex className="mt-5">
              {selectedStatus?.buttons?.map((item: any, index: number) => (
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

      {/* <CourierDrawer
        isDrawerOpen={isDrawerOpen?.status}
        editCity={isDrawerOpen?.type === "city"}
        courier={courierLabel}
        closeDrawer={handleDrawerClose}
        handleUpdate={() => console.log("Data Updated")}
        setFormDataHandler={updateShippingDetails}
        name={name}
        address1={address1}
        phone={phone}
        city={city}
        row={row}
      /> */}
    </>
  );
};
export default CustomExpandedComponent;
