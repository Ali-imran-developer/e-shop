import { ensureArray, showVariantImages } from "@/utils/helperFunctions/formater-helper";
import { ActionIcon, Avatar, Checkbox } from "rizzui";
import PencilIcon from "@/components/shared/components/icons/pencil";

const CustomExpandedComponent = ({
  row,
  isDrawerOpen,
  selectedVariantSkus,
  setSelectedVariantSkus,
  selectedRowIds,
  setSelectedRowIds,
  setIsDrawerOpen,
  closeDrawer,
}: any) => {
  const handleVariantSelect = (variant: any) => {
    const variantSku = variant.sku;
    const newSelectedVariants = new Set(selectedVariantSkus);    
    if (newSelectedVariants.has(variantSku)) {
      newSelectedVariants.delete(variantSku);      
      const allVariantsDeselected = row.original.variants.every(
        (v: any) => !newSelectedVariants.has(v.sku)
      );
      // if (allVariantsDeselected) {
      //   const newSelectedRows = new Set(selectedRowIds);
      //   newSelectedRows.delete(row.original._id);
      //   setSelectedRowIds(newSelectedRows);
      // }
    } else {
      newSelectedVariants.add(variantSku);
    }
    setSelectedVariantSkus(newSelectedVariants);
  };

  return (
    <>
      <div className="ms-[150px] h-full max-h-full max-w-3xl w-full py-4">
        {ensureArray(row?.original?.variants).map(
          (item: any, index: number) => {
            const productImageSrc = showVariantImages(row?.original?.images, item);
            return (
              <div key={index} className="flex items-center justify-between gap-2 p-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      className="ps-0"
                      checked={selectedVariantSkus.has(item?.sku)}
                      onChange={() => handleVariantSelect(item)}
                    />

                    <Avatar
                      src={productImageSrc ?? ""}
                      name={item?.title ?? ""}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-sm font-semibold">
                      {item?.title ?? ""}
                    </h1>
                    <p className="text-xs text-gray-500">{item?.sku ?? ""}</p>
                  </div>
                </div>
                <ActionIcon as="span" size="sm" variant="outline" aria-label="Edit Product" onClick={() => setIsDrawerOpen(true)}>
                  <PencilIcon className="text-gray-500 w-5 h-5" />
                </ActionIcon>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default CustomExpandedComponent;