import Table from "@shared/components/table/table";
import { Text } from "rizzui";
import CustomExpandedComponent from "./expanded-row";
import { useTanStackTable } from "@/components/shared/components/table/custom/use-TanStack-Table";
import { LineItem, ordersDetailColumns } from "./columns";
import { useEffect, useState } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

interface OrderViewProductsProps {
  data?: LineItem[];
  QuantityUpdate?: (updatedDetails: any) => void;
}

export default function OrderViewProducts({
  data,
  QuantityUpdate,
}: OrderViewProductsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-5 text-center">
        <Text>No products found in this order</Text>
      </div>
    );
  }
  const [expandedRowId, setExpandedRowId] = useState<any>(null);
  const { table, setData, setColumns } = useTanStackTable<any>({
    tableData: ensureArray(data),
    columnConfig: ordersDetailColumns({ expandedRowId }),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
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
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    setData(ensureArray(data));
    setExpandedRowId(null);

  },[data])

    useEffect(() => {
      setColumns(ordersDetailColumns({ expandedRowId }));

    }, [expandedRowId]);

  return (
    <Table
      table={table}
      expandedRowId={expandedRowId}
      classNames={{
        container: "border border-muted rounded-md border-t-0",
        rowClassName: "last:border-0",
      }}
      // @ts-ignore
      className="text-sm"
      variant="modern"
      rowKey={(record: any) => record.id}
      scroll={{ x: 800 }}
      components={{
        expandedComponent: () => (
          <CustomExpandedComponent onQuantityUpdate={QuantityUpdate} />
        ),
      }}
    />
  );
}
