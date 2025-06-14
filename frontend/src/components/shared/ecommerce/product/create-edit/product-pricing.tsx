import cn from "@/utils/helperFunctions/class-names";
import { Input } from "rizzui";
import { FormikProps } from "formik";
import FormGroup from "@/components/shared/form-group";

interface PricingFormValues {
  variants: [
    {
      price?: number | string;
      compareAtPrice?: number | string;
      costPerItem?: number | string;
    }
  ];
  // pricing?: {
  //   profit?: number;
  //   margin?: number;
  // };
}

export default function ProductPricing({
  formik,
  className,
}: {
  formik: FormikProps<PricingFormValues>;
  className?: string;
}) {
  const price = Number(formik.values.variants[0]?.price) || 0;
  const costPerItem = Number(formik.values.variants[0]?.costPerItem) || 0;
  const profit = price - costPerItem;
  const margin = price > 0 ? (profit / price) * 100 : 0;

  return (
    <>
      <FormGroup
        title="Pricing"
        description="Add your product pricing here"
        className={cn(className)}
      >
        <div className="grid gap-4 @2xl:grid-cols-2 col-span-full">
          <Input
            label="Price"
            name="variants[0].price"
            placeholder="10000"
            value={formik?.values?.variants[0]?.price}
            onChange={formik?.handleChange}
            prefix={"Rs. "}
            type="number"
            required
          />
          <Input
            label="Compare-at Price"
            name="variants[0].compareAtPrice"
            placeholder="15000"
            value={formik?.values?.variants[0]?.compareAtPrice}
            onChange={formik?.handleChange}
            prefix={"Rs. "}
            type="number"
          />
        </div>

        <div className="grid gap-4 @2xl:grid-cols-3 col-span-full">
          <Input
            label="Cost per item"
            name="variants[0].costPerItem"
            placeholder="6000"
            value={formik?.values?.variants[0]?.costPerItem}
            onChange={formik?.handleChange}
            prefix={"Rs. "}
            type="number"
          />
          <Input
            label="Profit"
            name="profit"
            placeholder="4000"
            value={profit}
            prefix={"Rs. "}
            type="number"
            disabled
          />
          <Input
            label="Margin (%)"
            name="pricing.margin"
            placeholder="40"
            value={`${Math.floor(margin)}%`}
            type="text"
            disabled
          />
        </div>
      </FormGroup>
    </>
  );
}
