import Table from "@shared/components/table/table";
import WidgetCard from "@/components/cardLayout/widgetCard";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { defaultData } from "@/data/dragDrop";
import cn from "@utils/helperFunctions/class-names";
import { useTanStackTable } from "@components/shared/components/table/custom/use-TanStack-Table";
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from "@/components/shared/components/table/custom/index";
import TableFooter from "@/components/shared/components/table/footer";
import TablePagination from "@/components/shared/components/table/pagination";
import { TableClassNameProps } from "@/components/shared/components/table/table-types";
import { useLocation, useParams } from "react-router-dom";
import { cardsData } from "@/data/reportData";
import { Input } from "rizzui";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import React from "react";

export type PersonType = (typeof defaultData)[number];
const TableColumnDnd = ({
  hidePagination = false,
  hideFooter = false,
  paginationClassName,
}: {
  pageSize?: number;
  searchAble?: boolean;
  tableHeader?: boolean;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  data: any;
  isDataLoaded: boolean;
  paginationClassName?: string;
}) => {
  const { state } = useLocation();
  const { link } = useParams();
  const card = cardsData.find((card) => card.link === link);
  const [tableData, setTableData] = React.useState(defaultData);

  const { table, handleDragEndColumn, sensors, columnOrder } =
    useTanStackTable<PersonType>({
      tableData: tableData,
      columnConfig: card?.column || [],
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 7,
          },
        },
        meta: {
          handleDeleteRow: (row) => {
            setTableData((prev) => prev.filter((r) => r.id !== row.id));
          },
        },
      },
    });

  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = defaultData.filter((item) =>
      Object.keys(item).some((key) => {
        const value = item[key as keyof typeof item];
        if (typeof value === "string" || typeof value === "number") {
          return String(value).toLowerCase().includes(lowerCaseQuery);
        }
        return false;
      })
    );
    setTableData(filteredData);
  };

  return (
    <WidgetCard
      table={defaultData}
      title={state?.title}
      columns={card?.column}
      className="space-y-4"
      path1="Report"
      path2={state?.breadCrumb}
      action={
        <Input
          type="search"
          clearable={true}
          inputClassName="h-[36px]"
          placeholder="Search by any field..."
          onClear={() => {
            setTableData(defaultData);
          }}
          prefix={<PiMagnifyingGlassBold className="size-4" />}
          onChange={(e) => {
            const query = e.target.value;
            handleSearch(query);
          }}
          className="w-full @3xl:order-3 @3xl:ms-auto @3xl:max-w-72"
        />
      }
    >
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEndColumn}
        sensors={sensors}
      >
        <Table
          table={table}
          variant="elegant"
          columnOrder={columnOrder}
          components={{
            headerCell: DragAbleHeadWrapper,
            bodyCell: DragAbleCellWrapper,
          }}
          classNames={{
            rowClassName: "last:border-0",
          }}
        />
        {!hideFooter && <TableFooter table={table} />}
        {!hidePagination && (
          <TablePagination
            table={table}
            className={cn("py-4", paginationClassName)}
          />
        )}
      </DndContext>
    </WidgetCard>
  );
};
export default TableColumnDnd;
