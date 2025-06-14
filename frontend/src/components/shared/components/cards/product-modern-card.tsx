import { Link } from "react-router-dom";

import { Title, Text } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import WishlistButton from "../wishlist-button";
import { generateSlug } from "@utils/helperFunctions/generate-slug";
import ColorSwatch from "@utils/helperFunctions/color-swatch";
import GetRating from "@/components/shared/ecommerce/shop/shop-filters/rating-filter";
import { toCurrency } from "@utils/helperFunctions/to-currency";
import { formatNumberWithCommas } from "@/utils/helperFunctions/format-number";

interface ProductProps {
  product: any;
  className?: string;
  routes: any;
}

export default function ProductModernCard({
  product,
  className,
  routes,
}: ProductProps) {
  const {
    title,
    thumbnail,
    slug,
    description,
    price,
    sale_price,
    colors = [],
  } = product;

  function stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  return (
    <div className={cn(className)}>
      <div className="relative">
        <div className="relative mx-auto aspect-[4/5.06] w-full overflow-hidden rounded-t-lg bg-gray-100">
          <img alt={title} src={product?.images[0]?.url || ""} className="h-full w-full object-cover" />
        </div>
        <WishlistButton className="absolute end-3 top-3" />
      </div>

      <div className="md:px-3 md:py-3 lg:px-4 lg:py-2">
        <Link to={routes.eCommerce.productDetails(String(slug ?? generateSlug(title)))}>
          <Title as="h6" className="mb-1 truncate font-semibold transition-colors hover:text-primary">
            {title}
          </Title>
        </Link>

        <Text as="p" className="truncate">
          {stripHtml(description)}
        </Text>
        <div className="mt-2 flex items-center font-semibold text-gray-900">
          {/* Rs. {Math.floor(product?.variants[0]?.price)} */}
          Rs. {formatNumberWithCommas(Math.floor(product?.variants[0]?.price))}
        </div>

        {colors?.length ? <ColorSwatch colors={product?.colors} /> : null}
      </div>
      {/* <GetRating state={{ rating: true || 102 }} applyFilter={(query: string, value: any) => {
        console.log(`Filter applied with query: ${query} and value:`, value);
      }} /> */}
    </div>
  );
}
