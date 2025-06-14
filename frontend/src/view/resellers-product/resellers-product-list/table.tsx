import { useEffect, useState, useTransition } from "react";
import cn from "@/utils/helperFunctions/class-names";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useProduct } from "@/hooks/product-hook";
import { reslaeProduct } from "@/hooks/resale-product-hook";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@shared/components/table/pagination";
import { ListForResaleColumns, ListedForResaleColumns } from "./columns";
import TableFooter from "./footer";
import ListDrawer from "./drawer";
import { TabList } from "@/components/shared/tabs";
import { TableVariantProps } from "rizzui";

const filterOptions = [
  { value: "listForResale", label: "List For Resale" },
  { value: "listedForResale", label: "Listed For Resale" },
];

interface ResellersProductTableProps {
  className?: string;
  data?: any[];
  listingProductData?: any[];
  isLoading?: boolean;
  isLoadingProduct?: boolean;
  hidePagination?: boolean;
  variant?: TableVariantProps;
}

export default function ResellersProductTable({
  className,
  data,
  isLoading,

  hidePagination = false,
  variant = "modern",
}: ResellersProductTableProps) {
  const [activeTab, setActiveTab] = useState("listForResale");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [row, setRow] = useState<any>(null);
  const [isPending, startTransition] = useTransition();

  const { table, setData, setColumns } = useTanStackTable<any>({
    tableData: ensureArray(data),
    columnConfig: [],
    options: {
      initialState: {
        pagination: { pageIndex: 0, pageSize: 20 },
        columnPinning: {
          left: ["expandedHandler"],
          right: ["action"],
        },
      },
      meta: {
        handleDeleteRow: (row) =>
          setData((prev) => prev.filter((r) => r.id !== row.id)),
      },
      enableColumnResizing: false,
    },
  });

  const AllRowsId = table
    ?.getSelectedRowModel()
    ?.rows?.map((row) => row?.original?._id);
  useEffect(() => {
    if (activeTab === "listedForResale") {
      setData(
        ensureArray(data).filter((item) => item?.listForResale?.isList === true)
      );
    } else {
      setData(ensureArray(data));
    }
  }, [data, activeTab]);

  useEffect(() => {
    if (activeTab === "listForResale") {
      setColumns(ListForResaleColumns({ setRow, setIsDrawerOpen }));
    } else {
      setColumns(ListedForResaleColumns());
    }
  }, [activeTab]);

  const handleTabSelect = (tab: string) => {
    startTransition(() => setActiveTab(tab));
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 p-4",
          className
        )}
      >
        <TabList
          tabs={filterOptions}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectTab={handleTabSelect}
        />
        <Table
          table={table}
          variant={variant}
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        <TableFooter
          table={table}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
        {!hidePagination && <TablePagination table={table} className="py-4" />}
      </div>
      <ListDrawer
        row={row}
        allRows={AllRowsId}
        isDrawerOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
      />
    </>
  );
}
