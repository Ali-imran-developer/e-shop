import FormGroup from "@shared/form-group";
import cn from "@utils/helperFunctions/class-names";
import ProductImageUpload from "./product-images";

export default function ProductMedia({
  className,
  imageFile,
  formik,
  currentEditedId,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
}: any) {

  return (
    <FormGroup
      title="Upload new product images"
      description="Upload your product image gallery here"
      className={cn(className)}
    >
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState} 
        formik={formik}
      />
    </FormGroup>
  );
}
