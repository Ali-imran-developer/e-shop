import SimpleBar from "@ui/simplebar";
import { Avatar, Empty, Text } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import DeletePopover from "@/components/shared/components/table/delete-popover";
import { PiMinus, PiPlus } from "react-icons/pi";

export default function SelectedItems({
  products,
  className,
  showControls,
  itemClassName,
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
}: {
  products: any;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
  clearItemFromCart: (item: any) => void;
  addItemToCart: (item: any) => void;
  removeItemFromCart: (item: any) => void;
}) {
  const selectedProducts = products?.filter((item: any) => item.checked && item.quantity > 0);
  
  if (!selectedProducts || selectedProducts.length === 0) {
    return (
      <div className="pb-3">
        <Empty />
      </div>
    );
  }

  return (
    <SimpleBar className={cn("pb-3", className)}>
      <div className={cn("grid gap-3.5", className)}>
        {selectedProducts.map((item: any) => {
          const quantity = item.quantity || 0;
          const totalPrice = item.price * quantity;
          return (
            <div key={item._id}>
              <div className="flex justify-between items-center mt-4 mb-2">
                <div className="flex items-center gap-2">
                  <Avatar name={item?.name ?? ""} src={item?.image ?? ""} />
                  <div className="flex items-start flex-col">
                    <Text className="font-semibold text-lg">
                      {item?.name ?? ""}
                    </Text>
                    <Text className="font-semibold text-sm text-gray-500">
                      {item?.category ?? ""}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                    <PiMinus
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => removeItemFromCart(item)}
                    />
                    <Text className="font-semibold">{quantity}</Text>
                    <PiPlus
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => addItemToCart(item)}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Text className="font-semibold">Rs. {totalPrice}</Text>
                    <DeletePopover
                      description="Are you really want to delete this product!"
                      onDelete={() => clearItemFromCart(item)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SimpleBar>
  );
}
