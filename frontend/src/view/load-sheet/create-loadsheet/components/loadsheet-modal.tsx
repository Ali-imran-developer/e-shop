import { routes } from "@/config/routes";
import { useCouriers } from "@/hooks/courier-hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Select } from "rizzui";
import CustomCourierDropdown from "./custom-dropdown";
import { useOrders } from "@/hooks/orders-hook";

type CourierModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const initialParams: any = {
  fulfillmentStatus: null,
  status: "booked",
  isAssigned: false,
  // deliveryStatus: "not_delivered",
  title: "",
  searchByCity: "",
  filterByCity: "",
  page: 1,
  limit: 50,
  startDate: null,
  endDate: null,
};
export default function CourierModal({ isOpen, onClose }: CourierModalProps) {
  const { handleGetOrders } = useOrders();
  const [couriers, setCouriers] = useState<any[]>([]);
  const [couriersLogo, setCouriersLogo] = useState<any[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<any>({});
  console.log("selectedCourier", selectedCourier);

  const { loadCouriers, getCouriersName } = useCouriers();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCouriers = async () => {
      const result = await loadCouriers();
      const myCouriers = await getCouriersName();
      setCouriers(result || []);
      setCouriersLogo(myCouriers);
    };

    if (isOpen) {
      fetchCouriers();
    }
  }, [isOpen]);

  const handleCourierChange = async (
    courierId: string,
    selectedCourierId: string
  ) => {
    setSelectedCourier({
      courierId: courierId,
      selectedCourierId: selectedCourierId,
    });
  };
  console.log("@selectedCourier", selectedCourier);
  const handleApplyClick = async () => {
    if (selectedCourier) {
      try {
        setIsLoading(true);
        const orders = await handleGetOrders(initialParams);
        const getSelectedCourierOrders = orders.filter(
          (item: any) => item?.tracking?.courier === selectedCourier.courierId
        );
        console.log("@getSelectedCourierOrders", getSelectedCourierOrders);
        navigate(routes.orders.CreateLoadSheet, {
          state: { courierOrders: getSelectedCourierOrders },
        });
      } catch (error) {
        console.log("@error", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold">Select Courier</h3>

        <CustomCourierDropdown
          couriers={couriers}
          couriersLogo={couriersLogo}
          onSelect={handleCourierChange}
          selectedCourier={selectedCourier}
        />

        <div className="pt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="outline"
            isLoading={isLoading}
            onClick={handleApplyClick}
            disabled={!selectedCourier?.courierId}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
}
