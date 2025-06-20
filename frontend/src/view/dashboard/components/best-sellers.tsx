import { useState } from "react";
import { DatePicker } from "@ui/datepicker";
import WidgetCard from "@shared/components/cards/widget-card";
import { Button, Text } from "rizzui";
import { topProducts } from '@data/top-products-data';
import Rating from "@shared/components/rating";

const currentDate = new Date();
const previousMonthDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 1,
  currentDate.getDate()
);

export default function BestSellers({ className }: { className?: string }) {
  const [rangeDate, setRangeDate] = useState<[Date | null, Date | null]>([
    previousMonthDate,
    currentDate,
  ]);

  return (
    <WidgetCard
      title={"Top Products"}
      description={
        <>
          Overview:
          <DatePicker
            selected={rangeDate?.[0]}
            onChange={(dates) => setRangeDate(dates)}
            startDate={rangeDate?.[0] as Date}
            endDate={rangeDate?.[1] as Date}
            monthsShown={1}
            placeholderText="Select Date in a Range"
            selectsRange
            inputProps={{
              variant: "text",
              inputClassName: "p-0 pe-1 h-auto ms-2 [&_input]:text-ellipsis",
              prefixClassName: "hidden",
            }}
          />
        </>
      }
      action={
        <Button variant="text" className="whitespace-nowrap underline">
          View All
        </Button>
      }
      descriptionClassName="mt-1 flex items-center [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper]:max-w-[228px] text-gray-500"
      className={className}
    >
      <div className="custom-scrollbar -me-2 mt-[18px] grid max-h-[460px] gap-4 overflow-y-auto @sm:gap-5">
        {topProducts.map((product) => (
          <div
            key={product.title + product.id}
            className="flex items-start pe-2"
          >
            <div className="relative me-3 h-11 w-11 shrink-0 overflow-hidden rounded bg-gray-100 @sm:h-12 @sm:w-12">
              <img
                src={product.image}
                alt={product.title}
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex w-full items-start justify-between">
              <div>
                <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                  {product.title}
                </Text>
                <Text className="text-gray-500">Rs. {product.price}</Text>
              </div>
              <div>
                <Rating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
