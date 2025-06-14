import { Controller, useFormContext } from "react-hook-form";
import { PhoneNumber } from "@ui/phone-input";
import { Input, Title } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { FormikProps } from "formik";
import { usePhoneNumberMask } from "@/utils/helperFunctions/phone-number";

interface AddressInfoProps {
  type: string;
  title?: string;
  className?: string;
  formik: any;
}

export default function AddressInfo({
  type,
  title,
  className,
  formik,
}: AddressInfoProps) {
  const { maskFormikValue } = usePhoneNumberMask();
  return (
    <div
      className={cn("grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5", className)}
    >
      {title && (
        <Title as="h3" className="col-span-full font-semibold">
          {title}
        </Title>
      )}

      <Input
        label="Name"
        placeholder="Enter your name"
        value={formik?.values?.shipmentDetails?.name}
        onChange={(e) => formik.setFieldValue("shipmentDetails.name", e.target.value)}
        error={
          formik?.touched?.shipmentDetails?.name &&
          formik?.errors?.shipmentDetails?.name
        }
      />

      <Input
        label="Phone Number"
        placeholder="Enter your number"
        type="number"
        name="shipmentDetails.phone"
        value={formik?.values?.shipmentDetails?.phone}
        onChange={maskFormikValue(formik?.handleChange, formik?.setFieldValue)}
        onBlur={formik?.handleBlur}
        error={
          formik?.touched?.shipmentDetails?.phone &&
          formik?.errors?.shipmentDetails?.phone
        }
      />

      <Input
        label="Email"
        name=""
        placeholder="Enter your email"
        value={formik?.values?.shipmentDetails?.email}
        onChange={(e) =>
          formik.setFieldValue("shipmentDetails.email", e.target.value)
        }
        error={
          formik?.touched?.shipmentDetails?.email &&
          formik?.errors?.shipmentDetails?.email
        }
      />

      <Input
        label="City"
        placeholder="Enter your city"
        value={formik.values.shipmentDetails.city}
        onChange={(e) =>
          formik.setFieldValue(
            "shipmentDetails.city",
            e.target.value
          )
        }
        error={
          formik?.touched?.shipmentDetails?.city &&
          formik?.errors?.shipmentDetails?.city
        }
      />
      <Input
        label="Address"
        placeholder="Address"
        className="col-span-full"
        value={formik.values.shipmentDetails.address}
        onChange={(e) =>
          formik.setFieldValue(
            "shipmentDetails.address",
            e.target.value
          )
        }
        error={
          formik?.touched?.shipmentDetails?.address &&
          formik?.errors?.shipmentDetails?.address
        }
      />
    </div>
  );
}
