import { PiArrowLineDownBold, PiArrowLineUpBold } from "react-icons/pi";
import { Button } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { exportToCSV } from "@utils/helperFunctions/export-to-csv";

type ExportButtonProps = {
  data: unknown[];
  header: string;
  fileName: string;
  className?: string;
};

export default function ExportCSVButton({
  data,
  header,
  fileName,
  className,
}: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={() => exportToCSV(data, header, fileName)}
      className={cn("w-full @lg:w-auto", className)}
    >
      <PiArrowLineDownBold className="me-1.5 h-[17px] w-[17px]" />
      Export Sample CSV
    </Button>
  );
}
