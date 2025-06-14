import DeletePopover from "@/components/shared/components/table/delete-popover";
import { useAppDispatch } from "@/hooks/store-hook";
import {
  deleteCategory,
  deleteSubCategory,
  fetchAllCategory,
} from "@/store/slices/categoriesSlice";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import toast from "react-hot-toast";
import { Avatar, Text } from "rizzui";

const CustomExpandedComponent = ({ row }: any) => {
  const selectedRow = row?.original;
  const dispatch = useAppDispatch();
  const selectedSubCategories = ensureArray(selectedRow?.subCategory);

  const handleSubCategoryDelete = async (sub: any) => {
    try {
      await dispatch(
        deleteSubCategory({
          categoryId: selectedRow._id,
          subCategoryId: sub._id,
        })
      );
      toast.success("Subcategory deleted successfully");
      dispatch(fetchAllCategory());
    } catch (error: any) {
      toast.error("Error deleting subcategory");
      console.error("Subcategory delete error:", error);
    }
  };

  return (
    <div className="py-4 ps-[180px]">
      {selectedSubCategories && selectedSubCategories.length > 0 ? (
        ensureArray(selectedSubCategories)?.map((sub: any, index: number) => (
          <div
            key={index}
            className={`my-1 flex items-center justify-between ${
              index !== selectedSubCategories?.length - 1
                ? "border-b border-gray-300"
                : ""
            }`}
          >
            <div className="text-gray-800 py-2 font-medium flex gap-4 items-center">
              <Avatar name={sub.name ?? ""} src="" />
              <Text className="font-semibold">{sub.name ?? ""}</Text>
            </div>
            <DeletePopover
              description="Are u really want to delete this subCategory!"
              onDelete={() => handleSubCategoryDelete(sub)}
            />
          </div>
        ))
      ) : (
        <div className="text-gray-500 font-semibold ms-[150px]">
          No Subcategories Available
        </div>
      )}
    </div>
  );
};

export default CustomExpandedComponent;
