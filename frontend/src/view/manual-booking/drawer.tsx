import { useFormik } from "formik";
import { useState } from "react";
import { Drawer, Button, Text, Input } from "rizzui";
import UploadZone from "./upload-zone";
import { useCouriers } from "@/hooks/courier-hook";
import toast from "react-hot-toast";
import CourierControllers from "@/controllers/courierController";

const CourierDrawer = ({
  isDrawerOpen,
  closeDrawer,
  selectedCourier,
  cancelCloseDrawer,
}: {
  isDrawerOpen?: any;
  closeDrawer: () => void;
  selectedCourier?: any;
  cancelCloseDrawer?: () => void;
}) => {
  const initialValues = {
    name: "",
    logo: "",
  };

  const { addCouriers } = useCouriers();
  const [isLoading, setIsLoading] = useState(false);
  const drawerCloseHandler = () => {
    closeDrawer();
  };

  const formik: any = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        setIsLoading(true);
        const data = await CourierControllers.addCourier(values);
        toast.success("Courier added successfully!");
        closeDrawer();
        return data;
      } catch (error: any) {
        console.error("Failed to load couriers:", error);
        toast.error("Failed to add courier. Please try again.");
        return error;
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={drawerCloseHandler}>
      <form
        className="px-4 pt-8 pb-4 h-full flex flex-col justify-between"
        onSubmit={formik.handleSubmit}
        autoComplete="off"
      >
        <div className="">
          <Text className="font-semibold text-xl">Add Custom Courier</Text>
          <div className="mt-8">
            <Input
              label="Courier Name"
              placeholder="Add courier name"
              value={formik?.values?.name}
              onChange={formik.handleChange}
              error={formik?.touched?.name && (formik?.errors?.name as any)}
              name="name"
            />
            <UploadZone formik={formik} name="logo" className="pt-8 px-2" />
          </div>
        </div>
        <div className="flex space-x-6">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={drawerCloseHandler}
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-black flex-1"
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default CourierDrawer;
