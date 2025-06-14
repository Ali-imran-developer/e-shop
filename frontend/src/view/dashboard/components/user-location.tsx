import { useState } from "react";
import WidgetCard from "@shared/components/cards/widget-card";
import cn from "@utils/helperFunctions/class-names";
import { DatePicker } from "@ui/datepicker";
import Table from "@shared/components/table/table";
import { useTanStackTable } from "@/components/shared/components/table/custom/use-TanStack-Table";
import { LocationColoumns } from "./cityColumn";

const data = [
  { id: 1, city: "Lahore", province: "Punjab", orders: 1180, amount: 282520, returnRatio: "11%" },
  { id: 2, city: "Karachi", province: "Sindh", orders: 980, amount: 250000, returnRatio: "9%" },
  { id: 3, city: "Faisalabad", province: "Punjab", orders: 800, amount: 180000, returnRatio: "8%" },
  { id: 4, city: "Islamabad", province: "Federal", orders: 600, amount: 150000, returnRatio: "7%" },
  { id: 5, city: "Peshawar", province: "KPK", orders: 500, amount: 120000, returnRatio: "6%" },
];

export default function UserLocation({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { table, setData } = useTanStackTable<any>({
    tableData: data,
    columnConfig: LocationColoumns(),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <WidgetCard
      title={"Top Cities"}
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)}
          dateFormat="MMM, yyyy"
          placeholderText="Select Month"
          showMonthYearPicker
          popperPlacement="bottom-end"
          inputProps={{
            variant: "text",
            inputClassName: "p-0 px-1 h-auto [&_input]:text-ellipsis",
          }}
          className="w-36"
        />
      }
      className={cn(
        "relative grid grid-cols-1 place-content-between gap-3",
        className
      )}
    >
      <div className="col-span-full -mx-5 border-t border-dashed border-muted px-5 pt-5 lg:-mx-7 lg:px-7">
        <Table
          table={table}
          classNames={{
            container: "border border-muted rounded-md border-t-0",
            rowClassName: "last:border-0",
          }}
        />
      </div>
    </WidgetCard>
  );
}
