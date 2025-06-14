import UploadZone from "@ui/file-upload/upload-zone";
import FormGroup from "@shared/form-group";
import cn from "@utils/helperFunctions/class-names";

interface FileType {
  url: string;
}

interface ProductMediaProps {
  className?: string;
  formik?: any;
}

export default function ProductMedia({ className, formik }: ProductMediaProps) {
  return (
    <FormGroup
      title="Upload new product images"
      description="Upload your product image gallery here"
      className={cn(className)}
    >
      <UploadZone className="col-span-full" name="images" formik={formik} />
    </FormGroup>
  );
}
