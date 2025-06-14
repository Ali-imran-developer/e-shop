import PencilIcon from "@/components/icons/pencil";
import { TanTableProductsDataType } from "@/types";
import TableAvatar from "@ui/avatar-card";
import { useState } from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Avatar, Button, Flex, Text, Title, Tooltip } from "rizzui";
import {
  ensureArray,
  showVariantImages,
} from "@/utils/helperFunctions/formater-helper";
import React from "react";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";

const CustomExpandedComponent = ({
  table,
  data,
  row,
  handleStatusChange,
  isLoading,
}: any) => {
  console.log("@@row", row?.original);

  const checkedItems =
    table && table?.getSelectedRowModel?.rows?.map((row: any) => row?.original);
  const [shippingDetails, setShippingDetails] = useState({
    sku: row?.original?.variants?.[0]?.sku || "N/A",
    stock: row?.original?.variants?.[0]?.stock?.available || "N/A",
    price: row?.original?.variants?.[0]?.price || "N/A",
    // city: row?.original?.shipping_address?.city || "",
  });
  // const products = row?.original?.line_items || {};
  const updateShippingDetails = (updatedData: any) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedData,
    }));
  };
  const { sku, stock, price } = shippingDetails;
  const [isDrawerOpen, setIsDrawerOpen] = useState({ status: false, type: "" });
  const handleDrawerClose = () => {
    setIsDrawerOpen({ status: false, type: "" });
  };
  const handleDrawerOpen = (val: any) => {
    setIsDrawerOpen(val);
  };

  return (
    <>
      <div className="grid grid-cols-2 ps-[160px] dark:bg-gray-50 bg-white">
        <div>
          {row?.original?.variants?.map((product: TanTableProductsDataType) => {
            const productImageSrc = showVariantImages(
              row?.original?.images,
              product
            );
            return (
              <article key={product?.title} className="w-full py-2 px-4">
                <div className="w-[800px] flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-full">
                      <Avatar name="DP" src={productImageSrc} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">
                        {product?.title || "Default Variant Title"}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {product?.category || ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product?.sku || ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-8">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-gray-900">
                        Stock
                      </span>
                      <span className="text-sm text-gray-700">
                        {product?.stock?.available || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-semibold text-gray-900">
                        Price
                      </span>
                      <span className="text-sm text-gray-700">
                        Rs. {formatNumberWithCommas(Math.floor(product?.price))}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CustomExpandedComponent;
