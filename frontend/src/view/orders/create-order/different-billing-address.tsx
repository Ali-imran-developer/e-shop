import { Checkbox } from "rizzui";
import ProductTaxonomies from "./product-tags";

interface DifferentBillingAddressProps {
  className?: string;
  formik: any;
}

export default function DifferentBillingAddress({
  className,
  formik,
}: DifferentBillingAddressProps) {
  return (
    <>
      <div className="flex justify-between">
        <Checkbox
          checked={true}
          label="Shipping Address is the same as Billing Address"
          className="text-gray-400"
        />
        <ProductTaxonomies className="py-4 mr-2" formik={formik} />
      </div>
    </>
  );
}
