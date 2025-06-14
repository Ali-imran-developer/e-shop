import { Textarea } from "rizzui";
import cn from "@utils/helperFunctions/class-names";

interface OrderNoteProps {
  className?: string;
  formik: any;
}

export default function OrderNote({ className, formik }: OrderNoteProps) {
  return (
    <div
      className={cn("border-t border-muted pt-4 @xs:pt-6 @5xl:pt-7", className)}
    >
      <Textarea
        label="Order Note (optional)"
        placeholder="Notes about your order, e.g. special notes for delivery."
        textareaClassName="h-20"
        value={formik.values.orderNote}
        onChange={(e) => formik.setFieldValue("orderNote", e.target.value)}
      />
    </div>
  );
}
