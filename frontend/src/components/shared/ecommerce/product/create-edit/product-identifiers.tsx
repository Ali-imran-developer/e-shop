import { useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import FormGroup from "@shared/form-group";
import CustomFields from "@shared/ecommerce/product/create-edit/custom-fields";

interface ProductIdentifiersProps {
  className?: string;
  formik?: any;
}

export default function ProductIdentifiers({
  className,
  formik,
}: ProductIdentifiersProps) {
  return (
    <FormGroup
      title="Product Identifiers"
      description="Edit your product identifiers here"
      className={cn(className)}
    >
      <Input
        label="Global Trade Item Number"
        placeholder="12345"
        name="identifiers.globalTradeItemNumber"
        value={formik?.values?.identifiers?.globalTradeItemNumber}
        onChange={formik?.handleChange}
        error={formik?.errors?.identifiers?.globalTradeItemNumber}
      />
      <Input
        label="Manufacturer Part Number"
        placeholder="145782"
        name="identifiers.manufacturerNumber"
        value={formik?.values?.identifiers?.manufacturerNumber}
        onChange={formik?.handleChange}
        error={formik?.errors?.identifiers?.manufacturerNumber}
      />
      <Input
        label="Brand Name"
        placeholder="brand name"
        name="identifiers.brandName"
        value={formik?.values?.identifiers?.brandName}
        onChange={formik?.handleChange}
        error={formik?.errors?.identifiers?.brandName}
      />
      <Input
        label="Product UPC/EAN"
        placeholder="145782"
        type="number"
        name="identifiers.productUpc"
        value={formik?.values?.identifiers?.productUpc}
        onChange={formik?.handleChange}
        error={formik?.errors?.identifiers?.productUpc}
      />
      <CustomFields formik={formik} />
    </FormGroup>
  );
}
