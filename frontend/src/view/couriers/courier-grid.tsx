import { Button, Tooltip, ActionIcon, Radio } from "rizzui";
import { useState, useEffect } from "react";
import PencilIcon from "../../components/shared/components/icons/pencil";
import cn from "../../utils/helperFunctions/class-names";
import CourierDrawer from "./courier-drawer";
import { Switch } from "rizzui";
import CourierControllers from "@/controllers/courierController";
import toast from "react-hot-toast";

export function Card({
  item,
  className,
  courier,
  isDefault,
  onDefaultChange,
  updateCourier,
  switchCourier,
}: {
  item: any;
  courier: any;
  className?: string;
  isDefault: boolean;
  switchCourier: boolean;
  onDefaultChange: (label: string) => void;
  updateCourier: (courier: any) => void;
  updateCouriers: any;
}) {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const switchHandler = async (e: any, data: any, courier: any) => {
    if (e.target.checked) {
      setIsSwitchChecked(data);
      setIsDrawerOpen(true);
      updateCourier(data);
    } else {
      try {
        const selectedCourierData: any = courier?.find(
          (c: any) => c.name === data.name
        );
        await CourierControllers.removeCourier(selectedCourierData._id).then(
          (e) => toast.success(e.message)
        );
        updateCourier(data);
      } catch (error) {
        console.log("@error", error);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "space-y-5 relative rounded-lg border border-muted bg-gray-0 p-2 shadow-sm transition-all dark:bg-gray-50 flex flex-col justify-between gap-y-2",
          className
        )}
      >
        <div className="flex w-full justify-between">
          <div className="w-full max-w-[100px]">
            <img src={item.logo} className="w-full h-full rounded-lg" />
          </div>
          <div className="flex flex-col items-center">
            <Switch
              size="sm"
              checked={switchCourier}
              onChange={(e) => switchHandler(e, item, courier)}
            />
            <Button
              variant="text"
              className="disabled:bg-transparent  p-0"
              onClick={() => setIsDrawerOpen(true)}
              disabled={!switchCourier}
            >
              <Tooltip content="Edit Courier" placement="top" color="invert">
                <ActionIcon
                  size="sm"
                  variant="outline"
                  className="disabled:bg-transparent"
                >
                  <PencilIcon className="h-4 w-4 disabled:bg-transparent" />
                </ActionIcon>
              </Tooltip>
            </Button>
          </div>
        </div>
        <Radio
          label="Default Courier"
          name="radio"
          size="sm"
          className="!mt-0"
          onChange={() => onDefaultChange(item.label)}
          checked={isDefault}
          disabled={!switchCourier}
        />
      </div>
      <CourierDrawer
        courier={item}
        selectedCourier={courier}
        isDrawerOpen={isDrawerOpen}
        closeDrawer={handleDrawerClose}
        cancelCloseDrawer={() => updateCourier(isSwitchChecked)}
      />
    </>
  );
}
