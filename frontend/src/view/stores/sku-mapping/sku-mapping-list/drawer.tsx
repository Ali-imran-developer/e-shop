import SearchDropdown from "@/components/shared/components/search-filter";
import { Form } from "@/components/ui/form";
import SkuMappingController from "@/controllers/skumappingController";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useFormik, FormikHelpers } from "formik";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Drawer,
  Button,
  Input,
  Select,
  Avatar,
  Title,
  Text,
  Radio,
} from "rizzui";
import { DrawerProps, FormValues } from "./type";

export default function CourierDrawer({
  isDrawerOpen,
  filteredData,
  data,
  selectedVariant,
  closeDrawer,
  handleUpdate,
  setFormDataHandler,
  row,
}: DrawerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [radioSelection, setRadioSelection] = useState<"select" | "unique">("select");

  const initialValues: FormValues = {
    productSku: "",
    productName: "",
    storeName: "",
    selectedProductData: {
      storeId: "",
      productId: "",
      variantId: "",
      sku: "",
    },
  };

  const mappedProducts = useMemo(() => {
    return ensureArray(data)?.filter(
      (item) => item?.mapped === true || item?.mapped === "mapped"
    );
  }, [data]);

  const mappedProductOptions = mappedProducts?.map((product: any) => ({
    value: product?.title,
    label: product?.title,
  }));

  useEffect(() => {
    if (selectedVariant) {
      formik?.setValues({
        productSku: selectedVariant?.sku || "",
        productName: selectedVariant?.title || "",
        storeName: "",
        selectedProductData: {
          storeId: "",
          productId: "",
          variantId: "",
          sku: "",
        },
      });
    }
  }, [selectedVariant]);

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
      const payload = {
        storeId: row.original.storeId,
        productId: row.original._id,
        variantId: selectedVariant?.id || "",
        sku: selectedVariant?.sku || "",
        mappedSku: [values.selectedProductData],
      };
      try {
        console.log("payload", payload);        
        // const response = await SkuMappingController.createSkuMapping(payload);
        // toast.success(response?.message || "Product mapped successfully!");
      } catch (error) {
        console.error("Error mapping product:", error);
        toast.error("Failed to map product!");
      } finally {
        setSubmitting(false);
        closeDrawer();
      }
    },
  });

  const handleSelectProduct = (selected: string) => {
    const product = mappedProducts.find((p) => p.title === selected);
    if (!product) return;
    const variant = product.variants?.[0];
    formik?.setValues({
      ...formik?.values,
      storeName: selected,
      selectedProductData: {
        storeId: product?.storeId,
        productId: product?._id,
        variantId: variant?.id || "",
        sku: variant?.sku || "",
      },
    });
  };

  return (
    <Drawer size="sm" isOpen={isDrawerOpen} onClose={closeDrawer}>
      <form className="@container h-full" onSubmit={formik?.handleSubmit}>
        <div className="py-10 px-5 flex flex-col justify-between min-h-full">
          <div className="flex flex-col flex-grow">
            <div className="flex gap-2 mb-8">
              <Avatar name="DP" src={""} size="xl" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Title as="h6">Sku:</Title>
                  <Text className="font-semibold">{selectedVariant?.sku || "N/A"}</Text>
                </div>
                <div className="flex items-baseline gap-2">
                  <Title as="h6">Name:</Title>
                  <Text className="font-semibold line-clamp-2 max-w-[200px]">
                    {selectedVariant?.title || "N/A"}
                  </Text>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Radio
                name="radio"
                size="sm"
                className="mt-6"
                checked={radioSelection === "select"}
                onChange={() => setRadioSelection("select")}
              />
              <SearchDropdown
                getOptionValue={(option) => option?.value}
                options={mappedProductOptions}
                value={formik?.values?.storeName}
                error={formik?.errors?.storeName}
                label="Main Sku - Product Name"
                dropdownClassName="max-h-48 overflow-y-auto"
                onChange={handleSelectProduct}
                placeholder="Select Product"
              />
            </div>
            {formik?.values?.selectedProductData?.productId && (
              <div className="flex items-center justify-center gap-2">
                <Avatar name="DP" src={""} size="xl" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Title as="h6">Product Sku:</Title>
                    <Text className="font-semibold">{formik?.values?.selectedProductData?.sku}</Text>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <Title as="h6">Product Name:</Title>
                    <Text className="font-semibold">{formik?.values?.storeName}</Text>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 mt-8">
              <Radio
                name="radio"
                size="sm"
                className="!mt-0"
                checked={radioSelection === "unique"}
                onChange={() => setRadioSelection("unique")}
              />
              <Text className="font-semibold">
                This product is unique to this store, No mapping required!.
              </Text>
            </div>
          </div>

          <div className="flex space-x-6">
            <Button variant="outline" size="lg" className="flex-1" onClick={closeDrawer}>
              Cancel
            </Button>
            <Button className="text-white bg-blue flex-1" size="lg" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Drawer>
  );
}
