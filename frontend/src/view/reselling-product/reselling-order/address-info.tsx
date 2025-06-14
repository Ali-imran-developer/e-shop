import { Controller, useFormContext } from "react-hook-form";
import { PhoneNumber } from "@ui/phone-input";
import { Input, Title } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { FormikProps } from "formik";
import ShipperInfoController from "@/controllers/shipper-info";
import { useEffect, useState } from "react";
import SearchDropdown from "@/components/shared/components/search-filter";
import { AnyARecord } from "dns";
import { usePhoneNumberMask } from "@/utils/helperFunctions/phone-number";

interface AddressInfoProps {
  type: string;
  title?: string;
  className?: string;
  formik: any;
  showCities: any;
}

export default function AddressInfo({
  type,
  title,
  className,
  formik,
  showCities,
}: AddressInfoProps) {
  const [addresses, setAddresses] = useState<any>([]);
  const { maskFormikValue } = usePhoneNumberMask();
  useEffect(() => {
    const getAllShipperInfo = async () => {
      await ShipperInfoController.getAllShipperInfo()
        .then((res) => {
          const getShipperInfo = res?.map(
            (item: { _id: string; city: string }) => ({
              value: item?.city,
              label: item?.city,
            })
          );
          setAddresses(getShipperInfo);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    };
    getAllShipperInfo();
  }, []);

  // console.log("@addresses", addresses);

  // useEffect(() => {
  //   if (!formik.values. && addresses?.length) {
  //     formik.setFieldValue("shipperId", addresses[0].value);
  //   }
  // }, [addresses]);
  console.log("@formik", formik.errors);
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
        value={formik.values.shipmentDetails.addresses[0].name}
        onChange={(e) =>
          formik.setFieldValue(
            "shipmentDetails.addresses[0].name",
            e.target.value
          )
        }
        error={
          formik?.touched?.shipmentDetails?.addresses?.[0]?.name &&
          formik?.errors?.shipmentDetails?.addresses?.[0]?.name
        }
      />

      {/* <Input
        label="Phone Number"
        placeholder="Enter your number"
        type="number"
        value={formik.values.shipmentDetails.addresses[0].phone}
        onChange={(e) =>
          formik.setFieldValue(
            "shipmentDetails.addresses[0].phone",
            e.target.value
          )
        }
      /> */}
      <Input
        label="Phone Number"
        placeholder="Enter your number"
        type="number"
        value={formik.values.shipmentDetails.addresses[0].phone}
        onChange={maskFormikValue(formik.handleChange, formik.setFieldValue)}
        name="shipmentDetails.addresses[0].phone"
        error={
          formik?.touched?.shipmentDetails?.addresses?.[0]?.phone &&
          formik?.errors?.shipmentDetails?.addresses?.[0]?.phone
        }
      />

      <Input
        label="Email"
        name=""
        placeholder="Enter your email"
        value={formik.values.shipmentDetails.email}
        onChange={(e) =>
          formik.setFieldValue("shipmentDetails.email", e.target.value)
        }
        error={
          formik?.touched?.shipmentDetails?.email &&
          formik?.errors?.shipmentDetails?.email
        }
      />
      {/* <Input
        label="City"
        placeholder="Enter your city"
        value={formik.values.shipmentDetails.addresses[0].city}
        onChange={(e) =>
          formik.setFieldValue(
            "shipmentDetails.addresses[0].city",
            e.target.value
          )
        }
      /> */}
      <SearchDropdown
        label="City"
        placeholder="Enter your city"
        options={showCities}
        getOptionValue={(option) => option?.value}
        value={formik.values.shipmentDetails.addresses[0].city.city || ""}
        onChange={(value: string) => {
          formik.setFieldValue("shipmentDetails.addresses[0].city.city", value);
        }}
        error={
          formik?.touched?.shipmentDetails?.addresses?.[0]?.city?.city &&
          formik?.errors?.shipmentDetails?.addresses?.[0]?.city?.city
        }
      />

      <Input
        label="Address"
        placeholder="Address"
        className="col-span-full"
        value={formik.values.shipmentDetails.addresses[0].address1}
        onChange={(e) =>
          formik.setFieldValue(
            "shipmentDetails.addresses[0].address1",
            e.target.value
          )
        }
        error={
          formik?.touched?.shipmentDetails?.addresses?.[0]?.address1 &&
          formik?.errors?.shipmentDetails?.addresses?.[0]?.address1
        }
      />
    </div>
  );
}
