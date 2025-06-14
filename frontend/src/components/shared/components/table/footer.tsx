import { Button, Flex, Text } from "rizzui";
import { Table as ReactTableType } from "@tanstack/react-table";
import { useEffect } from "react";

interface TableToolbarProps<TData extends Record<string, any>> {
  table: ReactTableType<TData>;
  showDownloadButton?: boolean;
  onExport?: () => void;
  buttons?: any;
  handleStatusChange?: any;
  isLoading?: string;
}

export default function TableFooter<TData extends Record<string, any>>({
  table,
  showDownloadButton = true,
  onExport,
  buttons,
  handleStatusChange,
  isLoading,
}: TableToolbarProps<TData>) {
  const checkedItems =
    table && table?.getSelectedRowModel()?.rows?.map((row) => row?.original);
  const meta = table.options.meta;
  if (checkedItems?.length === 0) {
    return null;
  }

  // console.log("@checkedItems", table && table?.getSelectedRowModel());

  return (
    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      <div className="flex items-center gap-2">
        <Text as="strong">{checkedItems?.length}</Text>{" "}
        {checkedItems?.length >= 2 ? " Orders" : " Order"} selected{" "}
        {/* <Button
          size="sm"
          variant="text"
          className="underline"
          color="danger"
          // onClick={() => meta?.handleMultipleDelete?.(checkedItems)}
        >
          Delete Them
        </Button> */}
      </div>

      {/* {console.log("@checkedItems", buttons) as any} */}
      <div className="flex gap-4">
        <div className="flex gap-2">
          {checkedItems?.length >=1 &&
            buttons?.buttons?.map((item: any, index: number) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={item.className}
                color={item.color as any}
                isLoading={isLoading === item.title}
                onClick={() => handleStatusChange(checkedItems, item?.title)}
              >
                {item?.title}
              </Button>
            ))}
        </div>

        {/* {showDownloadButton && (
          <Button
            size="sm"
            onClick={onExport}
            className="dark:bg-gray-300 dark:text-gray-800"
          >
            Download {checkedItems.length}{" "}
            {checkedItems.length > 1 ? "Items" : "Item"}
          </Button>
        )} */}
      </div>
    </div>
  );
}
