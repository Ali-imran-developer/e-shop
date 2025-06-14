import Table from "@components/shared/components/table/table";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import TablePagination from "@components/shared/components/table/pagination";
import {SalesManagement, SalesManagementType} from "@data/salesManagement";
import { SalesManagementColumns } from "./columns";
import Filters from "./filters";
import TableFooter from "@shared/components/table/footer";
import { TableClassNameProps } from "@shared/components/table/table-types";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";
import { CustomExpandedComponent } from "@shared/components/table/custom/expanded-row-salesManagement";
import SalesMangementStats from "@/view/salesManagement/salesManagement-list/salesManagementStats";
import { Box } from "rizzui";

export default function SalesManagementTable({
  pageSize = 5,
  hideFilters = false,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: "border border-muted rounded-md",
    rowClassName: "last:border-0",
  },
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  data: any;
  isDataLoaded: boolean;
  paginationClassName?: string;
}) {

  const { table, setData } = useTanStackTable<SalesManagementType>({
    tableData: SalesManagement,
    columnConfig: SalesManagementColumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r: any) => r._id !== row._id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
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
      "productId,name,sku,price,stock,status,channel,sales",
      `products${selectedData.length}`
    );
  }

  return (
    <>
     <Box className="@container/jd">
     <SalesMangementStats className="mb-3" />
     </Box>
      {!hideFilters && <Filters table={table} />}

      <Table
        table={table}
        variant="modern"
        classNames={classNames}
        components={{
          expandedComponent: CustomExpandedComponent,
        }}
      />

      {!hideFooter && <TableFooter table={table} onExport={handleExportData} />}
      {!hidePagination && (
        <TablePagination
          table={table}
          className={cn("py-4", paginationClassName)}
        />
      )}
    </>
  );
}
