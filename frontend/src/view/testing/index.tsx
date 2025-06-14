import FormGroup from "@/components/shared/form-group";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Input } from "rizzui";
import { SubmitHandler } from "react-hook-form";
import {
  ensureObject,
  trimObjectValues,
} from "@/utils/helperFunctions/formater-helper";
import ShipperInfoController from "@/controllers/shipper-info";
import { addInfoSchema } from "@/utils/validators/addShipperInfo.schema";

interface FormValues {
  labelStoreName?: string;
  phoneNumber?: string;
  locationName?: string;
  city?: string;
  returnAddress?: string;
  address?: string;
}

const LabelComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { id } = params;
  console.log("location", id);
  const editAddress = location?.state?.address;
  const {
    address: {
      labelStoreName = "",
      phoneNumber = "",
      locationName = "",
      city = "",
      returnAddress = "",
      address = "",
    } = {},
  } = ensureObject(location?.state) || {};

  const initialValues: FormValues = {
    labelStoreName: labelStoreName ?? "",
    phoneNumber: phoneNumber ?? "",
    locationName: locationName ?? "",
    city: city ?? "",
    returnAddress: returnAddress ?? "",
    address: address ?? "",
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = trimObjectValues({
      ...trimObjectValues(ensureObject(data)),
      country: "Pakistan",
    });
    console.log("payload", payload);
  };

  return (
    <>
      <div className="label-tab-data">
        <Form<FormValues>
          validationSchema={addInfoSchema}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{ defaultValues: initialValues }}
        >
          {({ register, formState: { errors, isValid } }) => (
            <>
              <div className="mb-16 grid gap-7 divide-y divide-dashed divide-gray-100 @2xl:gap-9 @3xl:gap-20">
                <FormGroup
                  title={editAddress ? "Edit Shipper Info" : "Shipper Info"}
                  description={
                    editAddress
                      ? "Update your Shipper Info details here!"
                      : "Add all your Shipper Info details here!"
                  }
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    label="Location Name"
                    placeholder="Enter Your Location Name"
                    {...register("locationName")}
                    error={errors.locationName?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="City (Origin)"
                    placeholder="Enter your City"
                    {...register("city")}
                    error={errors.city?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Display Store Name"
                    placeholder="Enter your Store name"
                    {...register("labelStoreName")}
                    error={errors.labelStoreName?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Support Phone Number"
                    placeholder="Enter your Phone Number"
                    {...register("phoneNumber")}
                    error={errors.phoneNumber?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Address"
                    placeholder="Enter your Address"
                    {...register("address")}
                    error={errors.address?.message}
                    className="flex-grow col-span-full"
                  />
                  <Input
                    label="Return Address for Reselling Orders"
                    placeholder="Enter your Address for Return Orders"
                    {...register("returnAddress")}
                    error={errors.returnAddress?.message}
                    className="flex-grow col-span-full"
                  />
                </FormGroup>
              </div>
              <hr className="py-4" />
              <div className="flex justify-end gap-4">
                <Button
                  className="w-full @lg:w-auto cursor-pointer"
                  type="submit"
                  disabled={!isValid}
                  isLoading={isLoading}
                >
                  {editAddress ? "Update Info" : "Submit"}
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>
    </>
  );
};

export default LabelComponent;
