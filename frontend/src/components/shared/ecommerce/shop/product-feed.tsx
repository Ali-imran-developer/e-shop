import { useEffect, useState } from "react";
import { Button } from "rizzui";
import ProductModernCard from "@shared/components/cards/product-modern-card";
import { modernProductsGrid } from "@data/shop-products";
import hasSearchedParams from "@utils/helperFunctions/has-searched-params";
// Note: using shuffle to simulate the filter effect
import shuffle from "lodash/shuffle";
import { routes } from "@/config/routes";
import { useProduct } from "@/hooks/product-hook";
import { useAppSelector } from "@/hooks/store-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { Loading } from "../../loader";

let countPerPage = 12;

export default function ProductFeed() {
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  const { handleGetProducts, isLoading } = useProduct();
  const { data, isDataLoaded } = useAppSelector((state) => state?.Products);

  useEffect(() => {
    if (!isDataLoaded) {
      handleGetProducts();
    }
  }, []);

  const filteredData = hasSearchedParams()
    ? shuffle(ensureArray(data))
    : ensureArray(data);

  return (
    <div className="@container border-gray-300 border rounded-lg px-4 py-6">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-9 4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
            {filteredData?.slice(0, nextPage)?.map((product, index) => (
              <ProductModernCard
                className="border border-gray-200 rounded-lg"
                key={product.id}
                product={product}
                routes={routes}
              />
            ))}
          </div>

          {nextPage < filteredData?.length && (
            <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
              <Button isLoading={loading} onClick={() => handleLoadMore()}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
