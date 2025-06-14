import { CALLBACK_STATUS } from "@/config/enums";
import { useAuth } from "@/hooks/auth-hooks";
import { useCouriers } from "@/hooks/courier-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Drawer, Input, Button } from "rizzui";

const courierFields: Record<
  string,
  { label: string; name: string; type: string }[]
> = {
  "M&P": [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Security Key", name: "apiPassword", type: "password" },
  ],
  TPL: [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Security Key", name: "apiPassword", type: "password" },
  ],
  Swyft: [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Security Key", name: "apiPassword", type: "password" },
  ],
  Trax: [
    { label: "API Key", name: "apiKey", type: "text" },
    { label: "Password", name: "apiPassword", type: "password" },
  ],
  PostEx: [{ label: "API Key", name: "apiKey", type: "text" }],
  Leopard: [
    { label: "API Key", name: "apiKey", type: "text" },
    // { label: "Password", name: "apiPassword", type: "password" },
  ],
  "Honey Bee": [
    { label: "HBC API Key", name: "apiKey", type: "text" },
    { label: "Merchant ID", name: "apiPassword", type: "password" },
  ],
};

const CourierDrawer = ({
  isDrawerOpen,
  closeDrawer,
  courier,
  selectedCourier,
  cancelCloseDrawer,
}: {
  isDrawerOpen: boolean;
  courier: {
    find(arg0: (c: any) => boolean): unknown;
    name: string;
    _id: string;
  };
  closeDrawer: () => void;
  selectedCourier: any;
  cancelCloseDrawer: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const { handleAddCourierKeys, updateMyCouriers } = useCouriers();

  const functionCallBack: any = {
    [CALLBACK_STATUS.LOADING]: (payload: any) => {
      setIsLoading(payload);
    },
    [CALLBACK_STATUS.SUCCESS]: async (payload: any) => {
      toast.success(payload.message);
      closeDrawer();
    },
    [CALLBACK_STATUS.ERROR]: (payload: any) => {
      toast.error(payload.message);
      setIsLoading(false);
    },
  };

  const drawerCloseHandler = () => {
    formik.resetForm(); 
    closeDrawer();
    if (!selectedCourierData) {
      cancelCloseDrawer();
    }
  };

  const selectedCourierData: any = ensureArray(selectedCourier).find(
    (c: any) => c.name === courier.name
  );
  console.log("@selectedCourierData", selectedCourierData);
  const formik: any = useFormik({
    initialValues:
      courierFields[courier.name]?.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: selectedCourierData?.[field.name] || "",
        }),
        {}
      ) || {},
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {
        ...values,
        name: courier.name,
        courierId: courier._id,
      };
      // handleAddCourierKeys(payload, (status: string, payload: any) =>
      //   functionCallBack[status](payload)
      // );
    },
  });

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={drawerCloseHandler}>
      <form
        className="space-y-3 h-full p-12 flex flex-col justify-between"
        onSubmit={formik.handleSubmit}
        autoComplete="new-password"
      >
        <div className="space-y-3">
          {courierFields[courier.name]?.map((item) => {
            return (
              <Input
                key={item.name}
                label={item.label}
                name={item.name}
                type={item.type as any}
                value={formik.values[item.name]}
                onChange={formik.handleChange}
                required
                autoComplete="new-password"
              />
            );
          })}
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
            disabled={isLoading}
            isLoading={isLoading}
          >
            {selectedCourierData ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default CourierDrawer;
