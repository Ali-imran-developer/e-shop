import { useState, useEffect } from "react";
import { Button, Loader } from "rizzui";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useCouriers } from "@/hooks/courier-hook";
import CourierControllers from "@/controllers/courierController";
import { Card } from "./courier-grid";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import toast from "react-hot-toast";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/components/shared/page-header";
import { Link } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import { fetchAllCourier } from "@/store/slices/CourierSlice";

export const metadata = {
  ...metaObject("Couriers"),
};

const pageHeader = {
  title: "Couriers",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Couriers",
    },
  ],
};

const Couriers = () => {
  const dispatch = useAppDispatch();
  const { CourierList, isLoading } = useAppSelector((state) => state.Courier);
  const [loading, setIsLoading] = useState(true);
  const [myNewCouriers, setNewCouriers] = useState([]);
  const [defaultCourier, setDefaultCourier] = useState<string | null>("");
  const [updateCouriers, setUpdateCouriers] = useState<any>();
  const [selectedCourierLabels, setSelectedCourierLabels] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchAllCourier());

  }, []);

  const handleDefaultCourierChange = async (selectedCourier: string) => {
    try {
      setDefaultCourier(selectedCourier);
      await CourierControllers.defaultCityCourier({
        [selectedCourier]: [],
      });
    } catch (error) {
      console.log("Erorr", error);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link to="/create-courier-management" className="w-full @lg:w-auto">
            <Button as="span" className="@lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create LoadSheet
            </Button>
          </Link>
        </div>
      </PageHeader>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader size="xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ensureArray(CourierList)?.map((item: any, index) => (
            <>
              <Card
                key={index}
                item={item}
                updateCouriers={updateCouriers}
                className="min-w-[200px] hover:-translate-y-0 hover:shadow-none"
                courier={CourierList}
                isDefault={defaultCourier === item.name}
                switchCourier={selectedCourierLabels?.includes(item.name)}
                onDefaultChange={handleDefaultCourierChange}
                updateCourier={undefined as any}
              />
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Couriers;