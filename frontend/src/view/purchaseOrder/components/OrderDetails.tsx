import { Button, Input, Textarea } from "rizzui";
import { ProductsDataType } from "./table";
import { useState } from "react";

interface OrderDetailsProps {
  orderItems: ProductsDataType[];
}

const OrderDetails = ({ orderItems }: OrderDetailsProps) => {
  const [shippingFee, setShippingFee] = useState(0);
  console.log("orderItems", orderItems);

  const calculateTotal = () => {
    let subtotal = 0;
    let totalTax = 0;
    let totalItems = orderItems.length;
    orderItems.forEach((products) => {
      console.log("products", products);
      const quantity = products.quantity || 0;
      const price = products.cost || 0;
      const tax = products.tax || 0;
      const totalItems = products;

      const productSubtotal = quantity * price;
      const productTax = productSubtotal * (tax / 100);

      subtotal += productSubtotal;
      totalTax += productTax;
    });
    const shippingFees = 0;
    const total = subtotal + totalTax + shippingFee;

    return { subtotal, totalTax, shippingFees, total, totalItems };
  };

  const { subtotal, totalTax, total, totalItems } =
    calculateTotal();

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const formatNumber = (value: number) => {
    return value.toLocaleString("en-IN");
  };

  return (
    <div className="flex gap-6 pt-4">
      <div className="w-1/2 border p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Additional details</h2>
        <div className="space-y-4">
          <div>
            <Input type="text" label="Reference number" />
          </div>
          <div>
            <Textarea label="Note to supplier"></Textarea>
          </div>
          <div>
            <Input type="text" label="Tags" />
          </div>
        </div>
      </div>

      <div className="w-1/2 p-6 border rounded-lg shadow-md h-fit">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Cost summary</h2>
          <Button variant="text" className="text-blue-600 text-sm">
            Manage
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Taxes (Included)</span>
            <span className="font-semibold">{formatCurrency(totalTax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="border-t pt-4 text-sm">
            <span className="font-semibold">Cost adjustments</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                className="w-24"
              />
              <span className="font-semibold">
                {formatCurrency(shippingFee)}
              </span>
            </div>
          </div>
            <div className=" text-sm text-muted-foreground">
              <span>{formatNumber(totalItems)} items</span>
            </div>
          <div className="border-t pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
