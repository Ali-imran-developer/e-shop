import { Input } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import FormGroup from "@shared/form-group";
import CustomFields from "./components/custom-fields";

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
        type="number"
        name="identifiers.globalTradeItemNumber"
        value={formik?.values?.identifiers?.globalTradeItemNumber}
        onChange={formik.handleChange}
        error={formik.errors?.identifiers?.globalTradeItemNumber}
        onFocus={() => {
          if (formik.values.identifiers.globalTradeItemNumber === 0) {
            formik.setFieldValue("identifiers.globalTradeItemNumber", "");
          }
        }}
        onBlur={() => {
          if (formik.values.identifiers.globalTradeItemNumber === "") {
            formik.setFieldValue("identifiers.globalTradeItemNumber", 0);
          }
        }}
      />
      <Input
        label="Manufacturer Part Number"
        placeholder="145782"
        name="identifiers.manufacturerNumber"
        value={formik?.values?.identifiers?.manufacturerNumber}
        onChange={formik?.handleChange}
        error={formik?.errors?.identifiers?.manufacturerNumber}
        onFocus={() => {
          if (formik?.values?.identifiers?.manufacturerNumber === 0) {
            formik.setFieldValue("identifiers.manufacturerNumber", "");
          }
        }}
        onBlur={() => {
          if (formik?.values?.identifiers?.manufacturerNumber === "") {
            formik.setFieldValue("identifiers.manufacturerNumber", 0);
          }
        }}
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
        label="Product UPC/EAN "
        placeholder="145782"
        type="number"
        name="identifiers.productUpc"
        value={formik?.values?.identifiers?.productUpc}
        onChange={formik?.handleChange}
        error={formik?.errors?.identifiers?.productUpc}
        onFocus={() => {
          if (formik?.values?.identifiers?.productUpc === 0) {
            formik.setFieldValue("identifiers.productUpc", "");
          }
        }}
        onBlur={() => {
          if (formik?.values?.identifiers?.productUpc === "") {
            formik.setFieldValue("identifiers.productUpc", 0);
          }
        }}
      />
      <CustomFields formik={formik} />
    </FormGroup>
  );
}
