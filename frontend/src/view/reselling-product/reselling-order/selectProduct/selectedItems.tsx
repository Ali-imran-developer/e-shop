import { PiMinus, PiPlus, PiTrash } from "react-icons/pi";
import { Avatar, Empty, Title } from "rizzui";
import { Link } from "react-router-dom";
import SimpleBar from "@ui/simplebar";
import { routes } from "@/config/routes";
import { generateSlug } from "@utils/helperFunctions/generate-slug";
import cn from "@utils/helperFunctions/class-names";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

export default function SelectedItems({
  items,
  className,
  itemClassName,
  showControls,
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
}: {
  items: any;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
  clearItemFromCart: (id: number) => void;
  addItemToCart: (item: any) => void;
  removeItemFromCart: (id: number) => void;
}) {
  if (!items || items.length === 0) {
    return (
      <div className="pb-3">
        <Empty />
      </div>
    );
  }

  return (
    <>
      <SimpleBar className={cn("pb-3", className)}>
        <div className={cn("grid gap-3.5", className)}>
          {ensureArray(items).map((item: any) => {
            const unitPrice = item?.variants?.[0]?.price || 0;
            const quantity = item?.quantity || 1;
            const mainTotal = unitPrice * quantity;

            const variants = ensureArray(item?.variants);
            const images = ensureArray(item?.images);

            const variantImageIds = variants
              .map((v: any) => v?.imageId)
              .filter(Boolean);
            const productImages = images.filter(
              (img: any) => img?.id && !variantImageIds.includes(img?.id)
            );
            const productImageSrc = "";

            const totalVariantPrice = variants.reduce((sum: number, v: any) => {
              return sum + (v?.price || 0) * (v?.quantity || 1);
            }, 0);

            console.log(
              "totalVariantPricetotalVariantPrice",
              totalVariantPrice
            );

            const totalPrice = totalVariantPrice;

            return (
              <div
                key={item._id}
                className={cn(
                  "group relative flex flex-col gap-2 border-b border-gray-200 pb-3",
                  itemClassName
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar src={productImageSrc} name={item?.title || ""} />
                    <div className="ps-3">
                      <Title
                        as="h3"
                        className="text-sm font-medium text-gray-700"
                      >
                        <Link
                          to={routes.eCommerce.productDetails(
                            generateSlug(item?.title)
                          )}
                        >
                          {item?.title || "N/A"}
                        </Link>
                      </Title>
                      {/* <div className="text-gray-500">
                        Rs. {Math.floor(unitPrice)} x {quantity}
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="pl-8 flex flex-col gap-2">
                  {variants.map((variant: any) => {
                    console.log("@@variant", variant?.quantity);
                    const variantQty = variant?.quantity || 1;
                    return (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between rounded border border-gray-100 p-2"
                      >
                        <div className="flex items-center">
                          <Avatar
                            src={""}
                            name={variant?.title || ""}
                          />
                          <div className="ps-3">
                            <Title as="h4" className="text-sm text-gray-700">
                              <Link
                                to={routes.eCommerce.productDetails(
                                  generateSlug(variant?.title)
                                )}
                              >
                                {variant?.title || "Variant"}
                              </Link>
                            </Title>
                            <div className="text-gray-500 text-xs">
                              Rs. {Math.floor(variant?.price || 0)} x{" "}
                              {variantQty}
                            </div>
                          </div>
                        </div>
                        {showControls && (
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center rounded bg-gray-100 p-0.5 text-xs">
                              <button
                                type="button"
                                title="Decrement"
                                className="grid h-5 w-5 place-content-center"
                                onClick={() => removeItemFromCart(variant)}
                                disabled={variantQty <= 1}
                              >
                                <PiMinus className="h-3 w-3" />
                              </button>
                              <span className="grid w-8 place-content-center">
                                {variantQty}
                              </span>
                              <button
                                type="button"
                                title="Increment"
                                className="grid h-5 w-5 place-content-center"
                                onClick={() => addItemToCart(variant)}
                              >
                                <PiPlus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => clearItemFromCart(variant)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <PiTrash className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Total Price for main product + all its variants */}
                {/* <div className="pl-8 text-right font-medium text-gray-700">
                  Rs. {Math.floor(totalPrice)}
                </div> */}
              </div>
            );
          })}
        </div>
      </SimpleBar>
    </>
  );
}