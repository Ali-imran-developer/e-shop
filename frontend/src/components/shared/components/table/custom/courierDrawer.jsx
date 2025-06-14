import { Form } from "@/components/ui/form";
import OrdersController from "@/controllers/ordersController";
import { editOrder, fetchAllOrders } from "@/store/slices/ordersSlice";
import { phoneNumberValidator, usePhoneNumberMask } from "@/utils/helperFunctions/phone-number";
import validationSchema from "@/validators/shipping-info";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Drawer, Input, Button } from "rizzui";

export default function CourierDrawer({
  isDrawerOpen,
  closeDrawer,
  name,
  email,
  address,
  phone,
  city,
  row,
}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { maskRHFValue } = usePhoneNumberMask();

  const initialValues = {
    name: name ?? "",
    email: email ?? "",
    address: address ?? "",
    phone: phone?.toString() ?? "",
    city: city ?? "",
  };

  const onSubmit = async (data) => {
    console.log("@@Form Values:", data, row?.original);
    try {
      setLoading(true);
      const response = await dispatch(editOrder({ id: row.original._id, formData: { shipmentDetails: data } })).unwrap();
      toast.success(response.message);
      closeDrawer();
      dispatch(fetchAllOrders());
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>
      <Form
        onSubmit={onSubmit}
        className="@container !h-full"
        validationSchema={validationSchema}
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
                  {...register("city")}
                  error={errors.city?.message}
                  className="flex-grow"
                />
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register("name")}
                  error={errors.name?.message}
                  className="flex-grow"
                />
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  {...register("email")}
                  error={errors.email?.message}
                  className="flex-grow"
                />
                <Input
                  label="Address"
                  placeholder="Enter your address1"
                  {...register("address")}
                  error={errors.address?.message}
                  className="flex-grow"
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone"
                  {...register("phone", phoneNumberValidator)}
                  onChange={maskRHFValue(register("phone").onChange)}
                  error={errors.phone?.message}
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={closeDrawer}
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
    </Drawer>
  );
}
