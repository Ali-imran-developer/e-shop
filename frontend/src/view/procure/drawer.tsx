import { useEffect, useState } from "react";
import { Drawer, Button, Input, Title, ActionIcon } from "rizzui";
import { PiPlusBold } from "react-icons/pi";
import TrashIcon from "@/components/shared/components/icons/trash";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrdersController from "@/controllers/ordersController";
import toast from "react-hot-toast";
import AuthController from "@/controllers/authController";

interface DrawerProps {
  isDrawerOpen: any;
  setFormDataHandler: any;
  handleUpdate: () => void;
  closeDrawer: () => void;
  procureStatuses: string[];
}

export default function ProcureDrawer({
  isDrawerOpen,
  closeDrawer,
  handleUpdate,
  setFormDataHandler,
  procureStatuses,
}: DrawerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      statuses: procureStatuses.length ? [...procureStatuses, ""] : [""],
    },
    // validationSchema: Yup.object().shape({
    //   statuses: Yup.array()
    //     .of(Yup.string().trim().required("Status cannot be empty"))
    //     .min(1, "At least one status is required"),
    // }),
    onSubmit: async (values) => {
      setIsLoading(true);
      const finalArray = values.statuses
        .map((field) => field.trim())
        .filter((field) => field !== "");

      try {
        await OrdersController.addProcureStatuses(finalArray).then((e) => {
          AuthController.setSession({ procureStatus: e.procureStatus });
          toast.success(e.message);
        });
        closeDrawer();
        console.log(finalArray);
        setFormDataHandler(finalArray);
      } catch (error) {
        console.log("@error", error);
      } finally {
        setIsLoading(false);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (procureStatuses.length) {
      formik.setFieldValue("statuses", [...procureStatuses, ""]);
    }
  }, [procureStatuses]);

  const handleChange = (index: number, value: string) => {
    const updatedFields = [...formik.values.statuses];
    updatedFields[index] = value;

    const filteredFields = updatedFields.filter(
      (field, idx) => field.trim() !== "" || idx === updatedFields.length - 1
    );

    if (filteredFields[filteredFields.length - 1].trim() !== "") {
      filteredFields.push("");
    }

    formik.setFieldValue("statuses", filteredFields);
  };

  const removeField = (index: number) => {
    const updatedFields = formik.values.statuses.filter((_, i) => i !== index);
    if (updatedFields.length === 0) {
      updatedFields.push("");
    }
    formik.setFieldValue("statuses", updatedFields);
  };

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>
      <form onSubmit={formik.handleSubmit} className="@container h-full">
        <div className="py-10 px-5 flex flex-col justify-between min-h-full">
          <div className="flex justify-between w-full items-baseline mb-4">
            <Title as="h4" className="flex items-center mb-4">
              <span className="text-gray-500">Add Status</span>
            </Title>
          </div>

          <div className="flex flex-col space-y-3 flex-grow">
            {formik.values.statuses.map((item, index) => (
              <div
                key={index}
                className="col-span-full flex items-center gap-4 xl:gap-7"
              >
                <Input
                  placeholder="Status name"
                  className="flex-grow"
                  value={item}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onBlur={() => formik.setFieldTouched(`statuses[${index}]`)}
                />

                {formik.values.statuses.length > 1 && item.trim() !== "" && (
                  <ActionIcon
                    onClick={() => removeField(index)}
                    variant="flat"
                    className="shrink-0"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </ActionIcon>
                )}
              </div>
            ))}
          </div>

          <div className="flex space-x-6 pt-6">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={closeDrawer}
            >
              Cancel
            </Button>
            <Button
              className="text-white bg-blue flex-1"
              size="lg"
              type="submit"
              isLoading={isLoading}
            >
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create
            </Button>
          </div>
        </div>
      </form>
    </Drawer>
  );
}
