import { useState } from "react";
import { Input, Title, Button, Modal } from "rizzui";
import { phoneNumberValidator, usePhoneNumberMask } from "@/utils/helperFunctions/phone-number";
import { Form } from "@/components/ui/form";
import OrdersController from "@/controllers/ordersController";
import validationSchema from "@/validators/shipping-info";
import { ensureObject } from "@/utils/helperFunctions/formater-helper";

export default function CustomerModel({
  onClose,
  show,
  orderData,
  initialData = {},
  onUpdate,
}: any) {
  const handleClose = () => {
    onClose();
  };

  const [loading, setLoading] = useState(false);
  const { maskRHFValue } = usePhoneNumberMask();
  const initialValues = {
    name: orderData?.shipmentDetails?.addresses[0]?.name ?? "",
    phone: orderData?.shipmentDetails?.addresses[0]?.phone ?? "",
    address1: orderData?.shipmentDetails?.addresses[0]?.address1 ?? "",
    // city: orderData?.shipmentDetails?.addresses[0]?.city?.city ?? "",
    city: {
      typo: "",
      city: orderData?.shipmentDetails?.addresses[0]?.city?.city ?? "",
    }
  };

  // const onSubmit = async (data: typeof initialValues) => {
  //   setLoading(true);
  //   const modifyPayload = [
  //     {
  //       ...data,
  //       address2: "",
  //       company: "",
  //       province: "",
  //       country: "",
  //       zip: "",
  //     },
  //   ];
  //   try {
  //     await OrdersController.updateShipmentDetails(
  //       orderData?._id,
  //       modifyPayload
  //     );
  //   } catch (error) {
  //     console.log("Error", error);
  //   } finally {
  //     setLoading(false);
  //     console.log("@modifyPayload", modifyPayload);

  //     // setFormDataHandler(data);
  //   }
  // };

  const onSubmit = async (data: typeof initialValues) => {
    setLoading(true);
    const modifyPayload = [
      {
        ...data,
        address2: "",
        company: "",
        province: "",
        country: "",
        zip: "",
      },
    ];
    try {
      await OrdersController.updateShipmentDetails(orderData?._id, modifyPayload);
      if (onUpdate) {onUpdate(data)}
      handleClose();
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={show}
      onClose={handleClose}
      overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
      containerClassName="dark:bg-gray-100/90 overflow-hidden dark:backdrop-blur-xl"
      className="z-[9999]"
      size="md"
    >
      <div className="m-auto p-6">
        <Title as="h3" className="mb-6 text-lg">
          Edit your Details
        </Title>
        <Form
          onSubmit={onSubmit}
          className="@container !h-full"
          // validationSchema={validationSchema as any}
          useFormProps={{
            defaultValues: initialValues,
          }}
        >
          {({ register, handleSubmit, formState: { errors } }) => (
            <div className="space-y-3 !h-full py-10 px-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-col space-y-3">
                  <Input
                    label="City"
                    placeholder="Enter your city"
                    {...register("city.city")}
                    // error={errors.city?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    {...register("name")}
                    // error={errors.name?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Address"
                    placeholder="Enter your address1"
                    {...register("address1")}
                    // error={errors.address1?.message}
                    className="flex-grow"
                  />
                  <Input
                    label="Phone"
                    placeholder="Enter your phone"
                    {...register("phone", phoneNumberValidator)}
                    onChange={maskRHFValue(register("phone").onChange)}
                    // error={errors.phone?.message}
                    className="flex-grow"
                  />
                </div>
              </div>
              <div className="flex space-x-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  className="text-white bg-black flex-1"
                  size="lg"
                  type="submit"
                  isLoading={loading}
                  onClick={handleSubmit(onSubmit)}
                >
                  Edit
                </Button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
}
