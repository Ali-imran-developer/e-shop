import { getStockStatus } from "@/components/shared/components/table-utils/get-stock-status";
import BrowseOrdersModal from "@/components/shared/modal-views/browse-orders";
import { ensureArray, showProductImages, showVariantImages } from "@/utils/helperFunctions/formater-helper";
import { Avatar, Box, Button, Checkbox, Input, Loader, Text } from "rizzui";
const VITE_AWS_S3_BUCKET_URL = import.meta.env.VITE_AWS_S3_BUCKET_URL;

export const ProductsModal = ({
  show,
  products,
  onClose,
  handleCheck,
  handleAddSelectedItems,
  checkedItemsCount,
  search,
  modalSearch,
  productModalSearchHandle,
  isLoading,
  formik,
}: any) => {
  // console.log("@products", products);
  return (
    <BrowseOrdersModal
      onClose={() => {
        onClose(), search("");
      }}
      show={show}
      title="All Products"
    >
      <div className="custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4">
        <Input
          className="w-full"
          placeholder="Select Product"
          value={modalSearch}
          autoFocus={true}
          onChange={productModalSearchHandle}
        />

        <div className="mt-6">
          {isLoading ? (
            <Loading />
          ) : (
            ensureArray(products)?.map((item: any, index: number) => {
              const totalStock = ensureArray(item?.variants).reduce((sum: any, item: any) => sum + (item?.stock?.available || 0),0);
              const isSingleVariant = item?.variants.length === 1;
              return (
                <div key={item._id || index}>
                  <div className="flex items-center justify-between py-3 border-gray-300 border-t-2 border-b-2">
                    <div
                      className={`flex items-center space-x-5 ${
                        isSingleVariant ? "" : "ms-10"
                      }`}
                    >
                      {isSingleVariant && (
                        <Checkbox
                          size="sm"
                          checked={item?.checked}
                          onChange={(e) => {
                            formik.setFieldValue("productId", item._id);
                            handleCheck(e, item);
                          }}
                        />
                      )}
                      <Avatar
                        name={item?.title || ""}
                        src={showProductImages(item) || ""}
                      />
                      <div className="flex flex-col">
                        <h6 className="text-base font-medium">
                          {item?.title || "N/A"}
                        </h6>
                        <p className="text-sm text-gray-500">
                          {item?.category || "N/A"}
                        </p>
                      </div>
                    </div>
                    <p className="text-base text-gray-500 w-32 text-center">
                      {totalStock} available
                    </p>
                    <p className="text-base text-gray-500 w-24 text-center">
                      {item?.variants?.[0]?.sku || ""}
                    </p>
                    <p className="text-base font-semibold w-24 text-right">
                      Rs. {item?.variants?.[0]?.price || 0}
                    </p>
                  </div>

                  {!isSingleVariant && (
                    <div className="flex flex-col gap-3 mx-12 mt-4">
                      {ensureArray(item?.variants).map((variant: any) => {
                        const variantImageSrc = showVariantImages(item?.images, variant);
                        return (
                          <div key={variant?.id} className="flex items-center gap-8 my-2">
                            <div className="flex items-center gap-3 w-[400px]">
                              <Checkbox
                                size="sm"
                                checked={variant?.checked}
                                onChange={(e) => {
                                  handleCheck(e, variant);
                                  formik.setFieldValue("productId", item._id);
                                }}
                              />
                              <Avatar
                                name={variant?.title || ""}
                                src={variantImageSrc || ""}
                              />
                              <Text className="font-semibold text-black">
                                {variant?.title || "Default Variant Title"}
                              </Text>
                            </div>
                            <div className="flex items-center justify-between w-full">
                              <Text>
                                {variant?.stock?.available || ""} Available
                              </Text>
                              <Text>{variant?.sku || ""}</Text>
                              <Text>Rs. {variant?.price || ""}</Text>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <Box className="border border-muted rounded-md p-3">
          <Text className="font-semibold">
            {checkedItemsCount} / {products.length} products selected
          </Text>
        </Box>
        <div className="flex gap-5">
          <Button
            variant="outline"
            onClick={() => {
              onClose(), search("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleAddSelectedItems}>Add</Button>
        </div>
      </div>
    </BrowseOrdersModal>
  );
};

export const Loading = () => {
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center">
      <Loader size="xl" />
    </div>
  );
};
