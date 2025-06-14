import { ActionIcon } from "rizzui";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { useEffect } from "react";

interface ExpandButtonProps {
  row: any;
  table?: any;
  handleStatusChange?: any;
  className?: any;
  expandedRowId?: string | null;
  onExpandRow?: (rowId: string) => void;
}

export const ExpandButton = ({ row, expandedRowId, onExpandRow, className, handleStatusChange, table }: ExpandButtonProps) => {
  const isExpanded = expandedRowId === row.id;

  useEffect(()=> {
    table.resetExpanded();

  },[handleStatusChange])
  return (
    <ActionIcon
      size="sm"
      rounded="full"
      aria-label="Expand row"
      className={className}
      variant={isExpanded ? "solid" : "outline"}
      onClick={() => onExpandRow && onExpandRow(row?.id)}
    >
      {isExpanded ? <PiCaretUpBold className="size-3.5" /> : <PiCaretDownBold className="size-3.5" />}
    </ActionIcon>
  );
};
