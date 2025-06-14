import { Input, Switch } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import FormGroup from "@shared/form-group";

interface ShippingInfoProps {
  className?: string;
  formik?: any;
}

export default function ShippingInfo({ className, formik }: ShippingInfoProps) {
  const handleFreeShipping = (e: any) => {
    const isFreeShipping = e.target.checked;
    formik?.setFieldValue("shipping.isCost", isFreeShipping);
    if (isFreeShipping) {
      formik?.setFieldValue("shipping.price", 0);
    }
  };

  const handleLocationShipping = (e: any) => {
    const isLocationBased = e.target.checked;
    formik?.setFieldValue("shipping.isLocationBased", isLocationBased);
    if (!isLocationBased) {
      formik?.setFieldValue("shipping.ShippingLocation", [
        { name: "", price: 0 },
      ]);
    }
  };

  return (
    <FormGroup
      title="Shipping"
      description="Add your shipping info here"
      className={cn(className)}
    >
      <Switch
        label="Free Shipping"
        className="col-span-full"
        checked={formik?.values?.shipping?.isCost}
        onChange={handleFreeShipping}
      />
      {!formik?.values?.shipping?.isCost && (
        <Input
          label="Shipping Price"
          placeholder="150.00"
          name="shipping.price"
          value={formik?.values?.shipping?.price}
          onChange={formik?.handleChange}
          error={
            formik?.touched?.shipping?.price && formik?.errors?.shipping?.price
              ? formik?.errors?.shipping?.price
              : undefined
          }
          onFocus={() => {
            if (formik?.values?.shipping?.price === 0) {
              formik.setFieldValue("shipping.price", "");
            }
          }}
          onBlur={() => {
            if (formik?.values?.shipping?.price === "") {
              formik.setFieldValue("shipping.price", 0);
            }
          }}
          prefix={"Rs. "}
          type="number"
        />
      )}
      <Switch
        label="Location Based Shipping"
        className="col-span-full"
        checked={formik?.values?.shipping?.isLocationBased}
        onChange={handleLocationShipping}
      />
      {formik?.values?.shipping?.isLocationBased && (
        <>
          <Input
            label="Location Name"
            placeholder="Enter location name"
            className="flex-grow"
            name="shipping.ShippingLocation[0].name"
            value={formik?.values?.shipping?.ShippingLocation[0]?.name}
            onChange={formik?.handleChange}
            // error={formik?.errors?.shipping?.ShippingLocation[0]?.name}
          />
          <Input
            label="Shipping Charge"
            placeholder="150.00"
            className="flex-grow"
            prefix={"Rs. "}
            name="shipping.ShippingLocation[0].price"
            value={formik?.values?.shipping?.ShippingLocation[0]?.price}
            onChange={(e) =>
              formik?.setFieldValue(
                "shipping.ShippingLocation[0].price",
                e.target.value ? parseFloat(e.target.value) : ""
              )
            }
            onFocus={() => {
              if (formik?.values?.shipping?.ShippingLocation[0]?.price === 0) {
                formik.setFieldValue("shipping.ShippingLocation[0].price", "");
              }
            }}
            onBlur={() => {
              if (formik?.values?.shipping?.ShippingLocation[0]?.price === "") {
                formik.setFieldValue("shipping.ShippingLocation[0].price", 0);
              }
            }}
            // error={formik?.errors?.shipping?.ShippingLocation[0]?.price}
          />
        </>
      )}
    </FormGroup>
  );
}
