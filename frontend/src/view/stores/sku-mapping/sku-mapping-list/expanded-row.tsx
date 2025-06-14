// import CourierDrawer from "./courierDrawer";
import PencilIcon from "@/components/shared/components/icons/pencil";
import { TanTableProductsDataType } from "@/types";
import { useState } from "react";
import { ActionIcon, Avatar } from "rizzui";
import CourierDrawer from "./drawer";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";

interface ExpandComponentProps {
  isDrawerOpen: any;
  data?: any;
  filteredData?: any;
  setFormDataHandler: any;
  row: any;
  handleUpdate: () => void;
  handleDrawerOpen: () => void;
  closeDrawer: () => void;
  table?: any;
  isLoading?: boolean;
  selectedStatus?: any;
  handleStatusChange?: any;
}

const CustomExpandedComponent = ({
  table,
  data,
  row,
  selectedStatus,
  handleStatusChange,
  isLoading,
  isDrawerOpen,
  filteredData,
  handleDrawerOpen,
  closeDrawer,
  handleUpdate,
  setFormDataHandler,
}: ExpandComponentProps) => {
  const [selectedVariant, setSelectedVariant] = useState({});

  // console.log("@@row", row?.original);

  // const checkedItems =
  //   table && table?.getSelectedRowModel?.rows?.map((row: any) => row?.original);
  // const [shippingDetails, setShippingDetails] = useState({
  //   sku: row?.original?.variants?.[0]?.sku || "N/A",
  //   stock: row?.original?.variants?.[0]?.stock?.available || "N/A",
  //   price: row?.original?.variants?.[0]?.price || "N/A",
  // });
  // const updateShippingDetails = (updatedData: any) => {
  //   setShippingDetails((prevDetails) => ({
  //     ...prevDetails,
  //     ...updatedData,
  //   }));
  // };
  // const { sku, stock, price } = shippingDetails;
  // const [isDrawerOpen, setIsDrawerOpen] = useState({ status: false, type: "" });
  // const handleDrawerClose = () => {
  //   setIsDrawerOpen({ status: false, type: "" });
  // };
  // const handleDrawerOpen = (val: any) => {
  //   setIsDrawerOpen(val);
  // };

  return (
    <>
      <div className="grid grid-cols-1 ps-[140px] dark:bg-gray-50 bg-white">
        <div>
          {row?.original?.variants?.map(
            (product: TanTableProductsDataType, index: number) => {
              const isLast = index === row.original.variants.length - 1;
              return (
                <article
                  key={product.title}
                  className="max-w-4xl w-full py-2 px-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[800px] flex justify-between items-center ${
                        isLast ? "" : "border-b"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-full">
                          <Avatar name="DP" src={""} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">
                            {product.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {product.category}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product?.sku || "N/A"}
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

                    <ActionIcon
                      as="span"
                      size="sm"
                      variant="outline"
                      aria-label="View item"
                      onClick={() => {
                        setSelectedVariant(product);
                        handleDrawerOpen();
                      }}
                    >
                      <PencilIcon className="h-4 w-6 cursor-pointer" />
                    </ActionIcon>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </div>

      <CourierDrawer
        data={data}
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        handleUpdate={() => console.log("Data Updated")}
        setFormDataHandler={() => {}}
        row={row}
        selectedVariant={selectedVariant}
        filteredData={filteredData}
      />
    </>
  );
};

export default CustomExpandedComponent;
