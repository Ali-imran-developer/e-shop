import FormGroup from "@shared/form-group";
import cn from "@utils/helperFunctions/class-names";
import ProductAvailability from "@shared/ecommerce/product/create-edit/product-availability";
import InventoryTracing from "@shared/ecommerce/product/create-edit/inventory-tracking";
import ProductPricing from "@shared/ecommerce/product/create-edit/product-pricing";

interface PricingInventoryProps {
  className?: string;
  formik?: any;
}

export default function PricingInventory({ className, formik }: PricingInventoryProps) {
  return (
    <>
      <ProductPricing formik={formik} className={className}/>
      <InventoryTracing formik={formik} className={className}/>
      {/* <FormGroup
        title="Availability"
        description="Add your product inventory info here"
        className={cn(className)}
      >
        <ProductAvailability formik={formik}/>
      </FormGroup> */}
    </>
  );
}
