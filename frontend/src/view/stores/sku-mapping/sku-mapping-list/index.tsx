import Table from "@shared/components/table/table";
import { shopilamData } from "@data/sku-mapping";
import { useTanStackTable } from "@shared/components/table/custom/use-TanStack-Table";
import { Input, TableVariantProps } from "rizzui";
import { TabList } from "@/components/shared/tabs";
import { useEffect, useState, useTransition } from "react";
import { MappedColumns, UnMappedColumns } from "./column";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import CourierDrawer from "./drawer";
import { useProduct } from "@/hooks/product-hook";
import { useAppSelector } from "@/hooks/store-hook";
import TableFooter from "@shared/components/table/footer";
import CustomExpandedComponent from "./expanded-row";
import TablePagination from "@components/shared/components/table/pagination";
import cn from "@/utils/helperFunctions/class-names";
import { TableClassNameProps } from "@/components/shared/components/table/table-types";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const filterOptions = [
  {
    value: "mapped",
    label: "Mapped",
    buttons: [
      { title: "Confirm", className: "text-green-dark" },
      { title: "Pending", className: "text-orange" },
      { title: "Manual", className: "" },
      { title: "Cancel", color: "danger" },
    ],
  },
  {
    value: "unmapped",
    label: "Unmapped",
    buttons: [
      { title: "Confirm", className: "text-green-dark" },
      { title: "Manual", className: "" },
      { title: "Cancel", color: "danger" },
    ],
  },
];

interface BasicTableProps {
  stickyHeader?: boolean;
  variants?: TableVariantProps;
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  className?: string;
  paginationClassName?: string;
}

export default function BasicTable({
  stickyHeader = false,
  variants = "classic",
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  className,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0",
  },
  paginationClassName,
}: BasicTableProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<string>("mapped");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [expandedRowId, setExpandedRowId] = useState<any>(null);
  const [params, setParams] = useState<any>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const { handleGetProducts, isLoading } = useProduct();
  const { data } = useAppSelector((state) => state?.Products);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleDrawerOpen = (row: any) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const filtered = ensureArray(data)?.filter((item) => {
      if (activeTab === "mapped") {
        return item?.mapped === true || item?.mapped === "mapped";
      } else {
        return !item?.mapped || item?.mapped === "unmapped";
      }
    });
    setFilteredData(filtered);
  }, [activeTab, data]);

  const updateParams = (status: string) => {
    setParams((prev: any) => ({
      ...prev,
      status: status,
    }));
  };

  const { table, setData, setColumns } = useTanStackTable<any>({
    tableData: ensureArray(filteredData),
    columnConfig: [],
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleSelectRow: (row) => {
          if (expandedRowId === row?.original?._id) {
            setExpandedRowId(null);
          } else {
            setExpandedRowId(row?.original?._id);
          }
        },
        // handleDrawerOpen,
      },
      enableColumnResizing: false,
    },
  });

  const selectTab = (nextTab: string) => {
    startTransition(() => {
      setActiveTab(nextTab);
      handleGetProducts();
    });
  };

  useEffect(() => {
    const columns =
      activeTab === "mapped"
        ? MappedColumns({ expandedRowId })
        : UnMappedColumns({ expandedRowId });
    setColumns(columns);
  }, [activeTab, expandedRowId]);

  useEffect(() => {
    setData(ensureArray(filteredData));
    setExpandedRowId(null);
  }, [filteredData]);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2",
          className
        )}
      >
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search by Product Name..."
          onClear={() => table?.setGlobalFilter("")}
          value={table?.getState()?.globalFilter ?? ""}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => table?.setGlobalFilter(e?.target?.value)}
          className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72 pb-4 lg:pb-0 lg:pt-2"
        />
        <TabList
          tabs={filterOptions}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          updateParams={updateParams}
          selectTab={selectTab}
          className="mb-4"
        />
        <Table
          table={table}
          activeTab={activeTab}
          isLoading={isLoading}
          expandedRowId={expandedRowId}
          showLoadingText={isLoading}
          stickyHeader={stickyHeader}
          variant={variants}
          components={{
            expandedComponent: (row) => (
              <CustomExpandedComponent
                row={row}
                table={table}
                data={data}
                handleDrawerOpen={() => handleDrawerOpen(row?.original)}
                isDrawerOpen={isDrawerOpen}
                closeDrawer={handleDrawerClose}
                handleUpdate={() => console.log("Data Updated")}
                setFormDataHandler={() => {}}
                filteredData={filteredData}
                isLoading={isLoading}
              />
            ),
          }}
        />
        <TablePagination
          table={table}
          className={cn("py-4", paginationClassName)}
        />
      </div>
    </>
  );
}
