import { useEffect, useState } from "react";
import { Button, Input, Title } from "rizzui";
import ProductModernCard from "./product-modern-card";
import { routes } from "@/config/routes";
import { useAppSelector } from "@/hooks/store-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { Loading } from "@/components/shared/loader";
import { reslaeProduct } from "@/hooks/resale-product-hook";
import { useCategories } from "@/hooks/categories";

const categories = [
  { icon: "👔", name: "Men's Clothing & Accessories" },
  { icon: "👗", name: "Women's Clothing & Accessories" },
  { icon: "🧸", name: "Toys & Hobbies" },
  { icon: "🧴", name: "Beauty & Health" },
  { icon: "⌚", name: "Watches" },
  { icon: "💍", name: "Jewelry & Accessories" },
  { icon: "🌿", name: "Home & Garden" },
  { icon: "🍼", name: "Mother & Kids" },
  { icon: "⚽", name: "Sports & Entertainment" },
  { icon: "...", name: "More categories" },
];

export default function ProductFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const { handleGetListingProduct, isSetLoading } = reslaeProduct();
  const { handleGetPublicCategories } = useCategories();
  const { listData } = useAppSelector((state) => state?.resaleProduct);
  const [publicCategories, setPublicCategories] = useState([]);

  useEffect(() => {
    handleGetPublicCategories().then((e) => setPublicCategories(e));
    handleGetListingProduct();
  }, []);

  const filteredData = ensureArray(listData)?.filter((product) => {
    const lowerQuery = searchQuery.toLowerCase();
    const matchesName = product?.title?.toLowerCase().includes(lowerQuery);
    // const matchesPrice = product?.price?.toString() === searchQuery;
    return matchesName;
  });

  return (
    <div className="@container px-4 py-2">
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="">
          <Title as="h4">Search Products</Title>
        </div>
        <Input
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="max-w-4xl w-full placeholder:text-gray-400"
          type="search"
          placeholder="Search Product"
        />
        <Button onClick={() => handleGetListingProduct()}>Refresh</Button>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-8">
        {ensureArray(publicCategories).map((category, index) => (
          <div
            key={index}
            className="flex items-center p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
          >
            {/* <span className="text-2xl mr-2">{category.icon}</span> */}
            <span className="text-gray-600 text-sm font-semibold">
              {category.name}
            </span>
          </div>
        ))}
      </div>
      {isSetLoading ? (
        <Loading />
      ) : (
        <>
          <ProductModernCard
            className="border border-gray-200 rounded-lg"
            product={filteredData}
            routes={routes}
          />
        </>
      )}
    </div>
  );
}
