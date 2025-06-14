import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    handleDeleteRow?: (row: Row<TData>) => void;
    handleCustomerRow?: (row: Row<TData>) => void;
    handleSelectRow?: (row: Row<TData>) => void;
    handleDeleteProduct?: (row: Row<TData>) => void;
    handleDrawerOpen?: (row: Row<TData>) => void;
    handleSelectedRow?: (row: Row<TData>) => void;
    handleRemoveCategories?: (row: Row<TData>) => void;
    handlePrintOrderSlip?: (row: Row<TData>) => void;
    handlePrintLabelSlip?: (row: Row<TData>) => void;
    handleMultipleDelete?: (row: Row<TData>) => void;
    handleInputChange?: (row: Row<TData>) => void;
    handleSelectedValue?: (row: Row<TData>, value: any) => void;
    handleUpdateData?:(rowIndex: number, columnId: keyof TData, value: unknown) => void;
    handleSelectedShippingMethod?: (
      row: Row<TData>,
      val: any,
      name?: string
    ) => void;
    handleSelectedShippingInfo?: (
      row: Row<TData>,
      val: any,
      name?: string
    ) => void;
    handleSelectedCities?: (row: Row<TData>, val: any) => void;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    isColumnDraggable?: boolean;
  }
}
