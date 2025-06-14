import BrowseOrdersModal from "@/components/shared/modal-views/browse-orders";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { Avatar, Box, Button, Checkbox, Input, Loader, Text } from "rizzui";

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
  return (
    <BrowseOrdersModal
      onClose={() => {
        onClose();
        search("");
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
              return (
                <div key={item?._id ?? index}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-5">
                      <Checkbox
                        size="sm"
                        checked={item?.checked}
                        onChange={(e) => handleCheck(e, item)}
                      />
                      <Avatar name={item?.name ?? ""} src={item?.image ?? ""} />
                      <div className="flex flex-col">
                        <h6 className="text-base font-medium">
                          {item?.name ?? ""}
                        </h6>
                        <p className="text-sm text-gray-500">
                          {item?.category ?? ""}
                        </p>
                      </div>
                    </div>
                    <p className="text-base text-gray-500 w-32 text-center">
                      {item?.available ?? 0} Available
                    </p>
                    <p className="text-base text-gray-500 w-24 text-center">
                      {item?.stock ?? 0} Stock
                    </p>
                    <p className="text-base font-semibold w-24 text-right">
                      Rs. {item?.price ?? 0}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <Box className="border border-muted rounded-md p-3">
          <Text className="font-semibold">
            {checkedItemsCount} / {products?.length} products selected
          </Text>
        </Box>
        <div className="flex gap-5">
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              search("");
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
