import { DatePicker } from "@ui/datepicker";
import { Select } from "rizzui";
import cn from "@utils/helperFunctions/class-names";

interface CustomerInfoProps {
  className?: string;
  formik: any;
  isPrepaid?: boolean;
}

export default function CustomerInfo({ className, formik, isPrepaid }: CustomerInfoProps) {
  const paymentOptions = [{ value: "cod", label: "COD" },{ value: "prepaid", label: "Prepaid"}];
  return (
    <div className={cn("pt-3 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3", className)}>
      <div className="rounded-xl border border-gray-300 p-5 @sm:p-6 @md:p-7">
        <div className="space-y-4 @lg:space-y-5 @2xl:space-y-6">
          <Select
            dropdownClassName="!z-0"
            options={paymentOptions}
            label="Payment Method"
            value={formik.values.paymentMethod}
            onChange={(option: { label: string }) =>
              formik.setFieldValue("paymentMethod", option.label)
            }
            onBlur={() => formik.setFieldTouched("paymentMethod", true)}
          />

          <DatePicker
            inputProps={{ label: "Order date" }}
            placeholderText="Select Date"
            dateFormat="MM/dd/yyyy"
            selected={formik?.values?.createdAt}
            onChange={(date) => formik?.setFieldValue("createdAt", date)}
            onBlur={() => formik?.setFieldTouched("createdAt", true)}
            wrapperClassName="w-full"
          />
        </div>
      </div>
    </div>
  );
}
