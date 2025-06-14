import { Form } from "@/components/ui/form";
import { addNewCustomer, editCustomers, fetchAllCustomers } from "@/store/slices/customerSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { Drawer, Input, Button } from "rizzui";

export default function CustomerDrawer({ dispatch, isDrawerOpen, closeDrawer, customerData }) {
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(customerData);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if(isEdit){
        const response = await dispatch(editCustomers({ id: customerData?._id, formData: data })).unwrap();
        toast.success(response.message);
      }else{
        const response = await dispatch(addNewCustomer(data)).unwrap();
        toast.success(response.message);
      }
      closeDrawer();
      dispatch(fetchAllCustomers());
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
        useFormProps={{
          defaultValues: {
            customerName: customerData?.customerName || "",
            phone: customerData?.phone || "",
            city: customerData?.city || "",
            totalOrders: customerData?.totalOrders || 0,
            totalSpent: customerData?.totalSpent || 0,
          },
        }}
      >
        {({ register, handleSubmit, formState: { errors } }) => (
          <div className="space-y-3 !h-full py-10 px-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-col space-y-3">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register("customerName")}
                  error={errors.customerName?.message}
                  className="flex-grow"
                />
                <Input
                  label="Phone"
                  placeholder="Enter your phone"
                  {...register("phone")}
                  error={errors.phone?.message}
                  className="flex-grow"
                />
                <Input
                  label="City"
                  placeholder="Enter your city"
                  {...register("city")}
                  error={errors.city?.message}
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
                {isEdit ? "Edit Customer" : "Create Customer" }
              </Button>
            </div>
          </div>
        )}
      </Form>
    </Drawer>
  );
}
