import { Title, Text, Button } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";
import WishlistButton from "@/components/shared/components/wishlist-button";
import { PiCheck, PiCheckCircle, PiPlus, PiPlusBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ensureArray, showProductImages } from "@/utils/helperFunctions/formater-helper";
import Rating from "@/components/shared/components/rating";
import { BsEye } from "react-icons/bs";

interface ProductProps {
  product: any;
  className?: string;
  routes: any;
}

const productRatings = [5, 4, 4, 5, 3];
export default function ProductModernCard({
  product,
  className,
  routes,
}: ProductProps) {
  const navigate = useNavigate();
  function stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-9 4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
      {ensureArray(product)?.map((item: any, index: number) => {
        return (
          <div className={cn(className)} key={index}>
            <div className="relative">
              <div className="rounded-tl-lg rounded-tr-lg overflow-hidden bg-gray-100">
                <img
                  alt={item?.title || ""}
                  src={showProductImages(item) || ""}
                  className="h-[200px] max-w-lg w-full object-cover"
                />
              </div>
              <WishlistButton className="absolute end-3 top-3" />
            </div>

            <div className="md:px-3 md:py-3 lg:px-4 lg:py-2">
              <Title as="h4" className="truncate font-semibold transition-colors hover:text-primary">
                {item?.title || ""}
              </Title>

              {/* <Text as="p" className="truncate">
                {stripHtml(item?.description)}
              </Text> */}
              <div className="flex items-center font-semibold text-gray-900">
                {(() => {
                  const variants = ensureArray(item?.variants);
                  if (variants.length === 1) {
                    const singlePrice = formatNumberWithCommas(
                      Math.floor(variants[0]?.price)
                    );
                    return <Text className="font-semibold text-gray-500">Rs. {singlePrice || 0}</Text>;
                  } else if (variants.length > 1) {
                    const prices = variants
                      .map((variant: any) => variant?.price)
                      .filter((p: number) => typeof p === "number")
                      .sort((a: number, b: number) => a - b);
                    const minPrice = formatNumberWithCommas(
                      Math.floor(prices[0])
                    );
                    const maxPrice = formatNumberWithCommas(
                      Math.floor(prices[prices.length - 1])
                    );
                    return (
                      <Text className="font-semibold text-gray-500">
                        Rs. {minPrice} - {maxPrice}
                      </Text>
                    );
                  } else {
                    return <Text className="font-semibold text-gray-500">0</Text>;
                  }
                })()}
              </div>

              <div className="flex flex-col mt-4">
                <div className="flex justify-start items-start">
                  <Rating rating={productRatings} />
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center justify-between">
                    <Text className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                      <PiPlus /> Imports
                    </Text>
                    <Text>{item?.totalImports ?? 120}</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                      <BsEye className="text-blue-600 font-semibold" />{" "}
                      PageViews
                    </Text>
                    <Text>{item?.totalImports ?? 10}</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                      <PiCheckCircle className="text-red-600" /> Orders
                    </Text>
                    <Text>{item?.totalImports ?? 12}</Text>
                  </div>
                </div>
              </div>

              <div className="flex justify-start mt-4 cursor-pointer">
                <Button
                  as="span"
                  className="@lg:w-auto"
                  size="sm"
                  onClick={() =>
                    navigate(routes?.reselling?.createResellingOrder, {
                      state: { product: [item] },
                    })
                  }
                >
                  <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
