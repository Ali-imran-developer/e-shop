import { Button, Flex, Text } from "rizzui";
import { Table as ReactTableType } from "@tanstack/react-table";

interface TableToolbarProps<TData extends Record<string, any>> {
  table: ReactTableType<TData>;
  showDownloadButton?: boolean;
  onExport?: () => void;
  buttons?: any;
  isDrawerOpen?: any;
  setIsDrawerOpen?: any;
  handleStatusChange?: any;
  isLoading?: string;
}

export default function TableFooter<TData extends Record<string, any>>({
  table,
  showDownloadButton = true,
  onExport,
  isDrawerOpen,
  setIsDrawerOpen,
  buttons,
  handleStatusChange,
  isLoading,
}: TableToolbarProps<TData>) {
  const checkedItems =
    table && table?.getSelectedRowModel()?.rows?.map((row) => row?.original);
  const meta = table.options.meta;

  if (!checkedItems?.length) return null;

  return (
    <div className="sticky bottom-0 left-0 z-10 mt-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      <div>
        <Text as="strong">{checkedItems?.length}</Text>
        {checkedItems?.length >= 2 ? " Products" : " Product"} selected{" "}
      </div>

      <div className="flex gap-4">
        <div className="flex gap-2">
          {checkedItems?.length > 1 &&
            buttons?.buttons?.map((item: any, index: number) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={item.className}
                color={item.color as any}
                isLoading={isLoading === item.title}
                onClick={() => handleStatusChange(checkedItems, item.title)}
              >
                {item?.title}
              </Button>
            ))}
        </div>

        {/* {checkedItems?.length >= 2 && ( */}
          <Button size="sm" onClick={() => setIsDrawerOpen(true)} className="dark:bg-green-500 dark:text-white px-4">
            List Product
          </Button>
        {/* // )} */}
      </div>
    </div>
  );
}
