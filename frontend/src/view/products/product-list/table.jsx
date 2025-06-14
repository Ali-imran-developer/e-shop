import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import { productsListColumns } from "./columns";
import TableFooter from "@shared/components/table/footer";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";
import { useEffect, useState } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";
import { Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { deleteProduct, fetchAllProducts } from "@/store/slices/productSlice";
import { useAppSelector } from "@/hooks/store-hook";

export default function ProductsTable({
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
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, isLoading } = useAppSelector((state) => state.Products);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    dispatch(fetchAllProducts());

  }, [dispatch]);

  const { table, setData } = useTanStackTable({
    tableData: ensureArray(productList),
    columnConfig: productsListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleSelectRow: (row) => {
          navigate(routes?.products?.ediProduct(row?._id), {
            state: { row },
          });
        },
        handleDeleteProduct: (row) => {
          dispatch(deleteProduct(row._id)).then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
            }
          });
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      "ID,Name,Category,Sku,Price,Stock,Status,Rating",
      `product_data_${selectedData.length}`
    );
  }

  useEffect(() => {
    setData(ensureArray(productList));

  }, [productList]);

  return (
    <>
      <div
        className={cn(
          "rounded-xl border border-muted bg-gray-0 dark:bg-gray-50 px-4 py-2",
          className
        )}
      >
        <div className="flex items-end justify-end mb-4">
          <Input
            type="search"
            clearable={true}
            inputClassName="h-[36px]"
            placeholder="Search by any field..."
            onClear={() => table?.setGlobalFilter("")}
            value={table?.getState()?.globalFilter ?? ""}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
            onChange={(e) => table?.setGlobalFilter(e?.target?.value)}
            className="w-72 @3xl:order-3 @3xl:ms-auto @3xl:max-w-72 pb-4 lg:pb-0 lg:pt-2"
          />
        </div>
        <Table
          table={table}
          variant="modern"
          isLoading={isLoading}
          showLoadingText={isLoading}
          classNames={{
            container: "border border-muted rounded-md border-t-0 mt-4",
            rowClassName: "last:border-0",
          }}
        />
        {!hideFooter && (
          <TableFooter
            table={table}
            onExport={handleExportData}
            isLoading={""}
          />
        )}
        {!hidePagination && (
          <TablePagination
            table={table}
            className={cn("py-4", paginationClassName)}
          />
        )}
      </div>
    </>
  );
}
