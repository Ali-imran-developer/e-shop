import DiscountModel from "@/view/orders/order-modal/discount-modal";
import QuantityModel from "@/view/orders/order-modal/quantity-modal";
import RemoveItemModel from "@/view/orders/order-modal/remove-item-modal";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "rizzui";

const CustomExpandedComponent = ({ onQuantityUpdate }: any) => {
  const [discount, setDiscount] = useState(false);
  const [quantity, setQuantity] = useState(false);
  const location = useLocation();
  const orderData = location.state?.selectedOrder;
  const [selectedItem, setSelectedItem] = useState<{ quantity?: number } | null>(null);
  const [removeItem, setremoveItem] = useState(false);

  return (
    <>
      <div className="py-4 px-4 flex gap-2 items-center justify-end">
        <Button size="sm" onClick={() => setDiscount(true)}>
          Apply Discount
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setSelectedItem(orderData.line_items[0]);
            setQuantity(true);
          }}
        >
          Adjust Quantity
        </Button>
        <Button size="sm" onClick={() => setremoveItem(true)}>
          Remove item
        </Button>
      </div>

      <DiscountModel show={discount} onClose={() => setDiscount(false)} />
      <QuantityModel
        show={quantity}
        onClose={() => setQuantity(false)}
        data={selectedItem}
        initialData={{
          quantity: selectedItem?.quantity?.toString() || ''
        }}
        onUpdate={(updatedDetails) => {
          onQuantityUpdate(updatedDetails);
        }}
      />
      <RemoveItemModel show={removeItem} onClose={() => setremoveItem(false)} />
    </>
  );
};

export default CustomExpandedComponent;