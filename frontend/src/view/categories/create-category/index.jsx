import FormFooter from "@/components/shared/components/form-footer";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AdvancedRadio, Input, RadioGroup, Select, Text, Title } from "rizzui";
import { useAppSelector, useAppDispatch } from "@/hooks/store-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useNavigate } from "react-router-dom";
import { routes } from "@/config/routes";
import { PiX } from "react-icons/pi";
import {
  fetchAllCategory,
  addNewCategory,
  editCategory,
} from "@/store/slices/categoriesSlice";
// import FormGroup from "@/components/shared/form-group";
import cn from "@/utils/helperFunctions/class-names";

function FormGroup({ title, className, description, children }) {
  return (
    <div className={cn("grid gap-5 @3xl:grid-cols-12", className)}>
      <div className="col-span-full @4xl:col-span-4">
        <h4 className="text-base font-medium">{title}</h4>
        {description && <p className="mt-2">{description}</p>}
      </div>
      {children && (
        <div className="col-span-full grid gap-3 @2xl:grid-cols-2 @4xl:col-span-8 @4xl:gap-5 xl:gap-5">
          {children}
        </div>
      )}
    </div>
  );
}

const CreateCategory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);
  const { categoryList } = useAppSelector((state) => state.Categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [tempSubCategories, setTempSubCategories] = useState([]);

  const statusOptions = [
    { value: "active", name: "Active" },
    { value: "inActive", name: "In-Active" },
  ];

  const initialValues = {
    subCategoryName: "",
    description: "",
    status: "active",
  };  

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log("values", values);
      const trimmed = formik.values.subCategoryName.trim();
      if (selectedCategory) {
        if (tempSubCategories.length === 0 && !trimmed) {
          toast.error("Please add at least one subcategory.");
          return;
        }
        const updatedSubCategories = [...tempSubCategories];
        if (trimmed && !updatedSubCategories.includes(trimmed)) {
          updatedSubCategories.push(trimmed);
        }
        try {
          setLoading(true);
          const finalSubCategories = updatedSubCategories.map((name) => ({
            name,
            categoryId: selectedCategory?._id,
          }));
          const payload = {
            name: selectedCategory?.name,
            subCategory: finalSubCategories,
          };
          console.log("selectedCategory?._id", selectedCategory?._id);
          console.log("payload", payload);
          await dispatch(
            editCategory({
              id: selectedCategory?._id,
              formData: payload,
            })
          ).unwrap();
          toast.success("Subcategories added successfully!");
          navigate(routes?.products?.categories);
        } catch (error) {
          toast.error(error?.message || "Failed to add subcategory.");
        } finally {
          setLoading(false);
        }
        return;
      }
      if (!selectedCategory) {
        if (!trimmed) {
          toast.error("Please enter a category name.");
          return;
        }
        try {
          setLoading(true);
          const payload = {
            name: trimmed,
            subCategory: [],
            description: formik?.values?.description,
            status: formik?.values?.status,
          };
          await dispatch(addNewCategory(payload)).unwrap();
          toast.success("Category created successfully!");
          navigate(routes?.products?.categories);
        } catch (error) {
          toast.error(error?.message || "Failed to create category.");
        } finally {
          setLoading(false);
          setTempSubCategories([]);
        }
      }
    },
  });

  const handleRemoveSubCategory = (name) => {
    setTempSubCategories(tempSubCategories.filter((sub) => sub !== name));
  };

  const categoryOptions = ensureArray(categoryList)?.map((cat) => ({
    value: cat,
    label: cat?.name,
  }));

  return (
    <div>
      <div className="p-6 w-full max-w-full">
        <form onSubmit={formik?.handleSubmit} className="container">
          <FormGroup
            title="Add Category / Subcategory"
            description="Add your category, subCategory, description and necessary information from here."
            className="flex justify-between"
          >
            <div className="">
              <div className="flex gap-3 pb-4">
                <Input
                  label="Category or Subcategory Name"
                  placeholder="Enter Name"
                  name="subCategoryName"
                  className="max-w-xs w-full"
                  value={formik.values.subCategoryName}
                  onChange={formik.handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const trimmed = formik.values.subCategoryName.trim();
                      if (trimmed && !tempSubCategories.includes(trimmed)) {
                        setTempSubCategories([...tempSubCategories, trimmed]);
                        formik.setFieldValue("subCategoryName", "");
                      }
                    }
                  }}
                />

                {selectedCategory && (
                  <div className="flex flex-wrap gap-2">
                    {tempSubCategories.map((sub) => (
                      <div
                        key={sub}
                        className="flex items-center px-3 py-1 rounded-full bg-gray-200 text-sm"
                      >
                        {sub}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubCategory(sub)}
                          className="ml-2 text-grey-500 hover:text-red-700"
                        >
                          <PiX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <Select
                  getOptionValue={(option) => option?.value}
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={(val) => {
                    setSelectedCategory(val);
                    setCategoryId(val);
                  }}
                  label="Select Existing Category (Optional)"
                  dropdownClassName="max-h-48 overflow-y-auto"
                  placeholder="Select Category to add Subcategory"
                />
              </div>
              <div className="pb-4">
                <Input
                  label="Description (Optional)"
                  name="description"
                  placeholder="description..."
                  value={formik?.values?.description}
                  onChange={(e) =>
                    formik.setFieldValue("description", e.target.value)
                  }
                />
              </div>
              <RadioGroup
                value={formik?.values?.status}
                setValue={(value) => formik?.setFieldValue("status", value)}
                className="col-span-full flex gap-4"
              >
                {ensureArray(statusOptions)?.map((item) => (
                  <AdvancedRadio
                    key={item?.value}
                    value={item?.value}
                    contentClassName="px-4 py-6 w-[250px]"
                    inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 max-w-lg w-full"
                  >
                    <span>{item?.name}</span>
                  </AdvancedRadio>
                ))}
              </RadioGroup>
            </div>
          </FormGroup>

          <div className="flex items-end justify-end">
            <FormFooter
              altBtnText="Cancel"
              className="mt-6"
              submitBtnText="Save"
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;