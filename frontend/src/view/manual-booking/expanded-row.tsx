import { TanTableProductsDataType } from "@/types";
import { useEffect, useState } from "react";
import { PiXBold } from "react-icons/pi";
import { Button, Text, Title, Input, Avatar, Select } from "rizzui";
import SimpleBar from "simplebar-react";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import { useFormik } from "formik";
import TableAvatar from "@ui/avatar-card";
import CourierControllers from "@/controllers/courierController";
import { useCouriers } from "@/hooks/courier-hook";
import { useAppSelector } from "@/hooks/store-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

const CustomExpandedComponent = ({
  table,
  row,
  data,
  selectedStatus,
  isLoading,
}: any) => {
  const initialValues = {
    courierName: "",
    tracking: "",
  };

  const { getManualCouriers } = useCouriers();
  const { manualCourier } = useAppSelector((state) => state.Courier);
  const [tracking, setTracking] = useState<string>("");
  const [courier, setCourier] = useState<string>("");
  const [savedData, setSavedData] = useState<
    { tracking: string; courier: string }[]
  >([]);

  useEffect(() => {
    getManualCouriers();
  }, []);

  const courierNameOptions = ensureArray(manualCourier)?.map((item: any) => ({
    value: item?.name,
    label: item?.name,
  }));

  console.log("courierNameOptions", courierNameOptions);

  const formik = useFormik({
    initialValues,
    onSubmit(values) {
      console.log("values", values);
    },
  });

  return (
    <>
      <div className="grid grid-cols-2 px-[26px] dark:bg-gray-50 bg-white">
        <SimpleBar className="h-[250px] overflow-auto">
          <div className="">
            {row?.original?.lineItems?.map(
              (product: TanTableProductsDataType) => (
                <article
                  key={product.title}
                  className="flex items-center justify-between py-2 first-of-type:pt-2.5 last-of-type:pb-2.5 px-4"
                >
                  <div className="flex items-start">
                    <div className="w-12 flex-shrink-0 overflow-hidden rounded-full">
                      <TableAvatar
                        name={product?.name ?? ""}
                        src={product?.image ?? ""}
                      />
                    </div>
                    <header>
                      <Title as="h4" className="mb-0.5 text-sm font-medium">
                        {product.name}
                      </Title>
                      <Text className="mb-1 text-gray-500">
                        {product?.category}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        Unit Price: Rs.{" "}
                        {formatNumberWithCommas(Math.floor(product?.price))}
                      </Text>
                    </header>
                  </div>
                  <div
                    className={`flex max-w-xs items-end ${
                      Number(product?.quantity) * Number(product?.price) > 999
                        ? "gap-11"
                        : "gap-14"
                    }`}
                  >
                    <div className="flex items-center">
                      <PiXBold size={13} className="me-1 text-gray-500" />
                      <Text
                        as="span"
                        className="font-medium text-gray-900 dark:text-gray-700"
                      >
                        {product?.quantity}
                      </Text>
                    </div>
                    <Text className="font-medium text-gray-900 dark:text-gray-700">
                      Rs.{" "}
                      {formatNumberWithCommas(
                        Number(product?.quantity ?? 0) *
                          Math.floor(Number(product?.price ?? 0))
                      )}
                    </Text>
                  </div>
                </article>
              )
            )}
          </div>
        </SimpleBar>
        <div className="bg-white border-l-[1px] border-l-gray-200 p-4">
          <div className="mb-4 flex items-center">
            <form onSubmit={formik?.handleSubmit} className="container">
              <div className="flex items-center gap-4">
                <Select
                  options={courierNameOptions}
                  name="courierName"
                  placeholder="Select Courier..."
                  className="max-w-52 w-full"
                  label="Courier"
                  value={formik?.values?.courierName}
                  onChange={(selectedOption) =>
                    formik.setFieldValue("courierName", selectedOption)
                  }
                  getOptionValue={(option: any) => option?.value}
                  error={
                    formik?.touched?.courierName &&
                    (formik?.errors?.courierName as any)
                  }
                />
                <Input
                  type="text"
                  placeholder="Enter Tracking..."
                  label="Tracking"
                  name="tracking"
                  className="max-w-52 w-full"
                  value={formik?.values?.tracking}
                  onChange={formik?.handleChange}
                  error={
                    formik?.touched?.tracking &&
                    (formik?.errors?.tracking as any)
                  }
                />
              </div>
              <Button type="submit" className="mt-4">
                Book
              </Button>
            </form>
          </div>

          {/* {savedData.length > 0 && (
            <div className="mt-4">
              <Text className="text-sm font-medium">Saved Data:</Text>
              <div>
                {savedData.map((data, index) => (
                  <div key={index} className="mt-2">
                    <Text>Tracking: {data.tracking}</Text>
                    <Text>Courier: {data.courier}</Text>
                    <Button
                      color="danger"
                      onClick={() => handleRemove(index)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default CustomExpandedComponent;
