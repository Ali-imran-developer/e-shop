import { Title } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { ForwardedRef, forwardRef } from "react";
import ExportButton from "../shared/components/export-button";
import { averageDispatch, loadColoumn } from "@/view/reports/columns";

export const getColumnHeaders = (columns: any[]) => {
  return columns
    .filter((col) => col.header && typeof col.header === 'string')
    .map((col) => col.header)
    .join(',');
};

export const columnHeaders = getColumnHeaders(averageDispatch);

const widgetCardClasses = {
  base: "border border-muted bg-gray-0 p-5 dark:bg-gray-50 lg:p-7",
  rounded: {
    sm: "rounded-sm",
    DEFAULT: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
  },
};

type WidgetCardTypes = {
  title?: React.ReactNode;
  table?: any;
  path1?: string;
  path2?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof widgetCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
  className?: string;
  columns?:any
};

function WidgetCard(
  {
    title,
    path1,
    path2,
    action,
    description,
    rounded = "DEFAULT",
    className,
    headerClassName,
    actionClassName,
    titleClassName,
    descriptionClassName,
    children,
    table,
    columns
  }: React.PropsWithChildren<WidgetCardTypes>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col">
          <h2>{title}</h2>
          <div className="flex items-center justify-between py-4 px-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-semibold">
                <li>{path1}</li>
                <li>{path2}</li>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <ExportButton
            data={table}
            fileName="order_data"
            header={getColumnHeaders(columns)}
          />
        </div>
      </div>
      <div
        className={cn(widgetCardClasses.base, widgetCardClasses.rounded[rounded], className)}
        ref={ref}
      >
        <div className={cn(action && "flex items-start justify-between", headerClassName)}>
          <div>
            <Title
              as="h3"
              className={cn("text-base font-semibold sm:text-lg", titleClassName)}
            >
              {title}
            </Title>
            {description && <div className={descriptionClassName}>{description}</div>}
          </div>
          {action && <div className={cn("ps-2", actionClassName)}>{action}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

export default forwardRef(WidgetCard);
WidgetCard.displayName = "WidgetCard";
