import { TanTableProductsDataType } from "@/types";
import { Row } from "@tanstack/react-table";

import { PiXBold } from "react-icons/pi";
import { Checkbox, Flex, Text, Title } from "rizzui";

export function CustomExpandedComponent<TData extends Record<string, any>>(
  row: Row<TData>
) {
  const products = row?.original?.products;
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <Flex align="center" justify="center">
        <Text className="p-4 text-2xl text-gray-500">
          No products available for this order.
        </Text>
      </Flex>
    );
  }

  return (
    <div className="grid grid-cols-1 divide-y bg-gray-0 px-[150px] py-4 dark:bg-gray-">
      {products.map((product: TanTableProductsDataType) => (
        <article
          key={product.id + product.name}
          className="flex items-center justify-between py-3 first-of-type:pt-0.5 last-of-type:pb-0.5"
        >
          <div className="flex items-start">
            <Checkbox
              type="checkbox"
              className="me-4 mt-2 mr-6 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              // Optional: handle the checkbox state here
              onChange={(e) => {
                console.log(`${product.name} selected:`, e.target.checked);
              }}
            />
            <div className="relative me-4 aspect-[80/60] w-10 flex-shrink-0 rounded-md bg-gray-100">
              <img
                className="object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>

            <header>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.name}
              </Title>
              <Text className="text-xs text-gray-500">
                Unit Price: Rs. {product.price}
              </Text>
            </header>
          </div>
          <div className="flex w-full max-w-xs items-center justify-between gap-10">
            <div className="flex items-center">
              <Text
                as="span"
                className="font-medium text-gray-900 dark:text-gray-700"
              >
                {product.quantity} Avaiable
              </Text>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
