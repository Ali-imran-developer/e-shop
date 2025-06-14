import { Input } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import FormGroup from "@shared/form-group";

interface ProductSeoProps {
  className?: string;
  formik: any;
}

export default function ProductSeo({ className, formik }: ProductSeoProps) {
  return (
    <FormGroup
      title="Search Engine Optimization"
      description="Add your product's seo info here"
      className={cn(className)}
    >
      <Input
        label="Page Title"
        placeholder="page title"
        name="seo.title"
        value={formik?.values?.seo?.title}
        onChange={formik?.handleChange}
        error={formik?.errors?.seo?.title}
      />
      <Input
        label="Meta Keywords"
        placeholder="meta keywords"
        name="seo.metaKeywords"
        value={formik?.values?.seo?.metaKeywords}
        onChange={formik?.handleChange}
        error={formik?.errors?.seo?.metaKeywords}
      />
      <Input
        label="Meta Description"
        placeholder="meta description"
        name="seo.metaDescription"
        value={formik?.values?.seo?.metaDescription}
        onChange={formik?.handleChange}
        error={formik?.errors?.seo?.metaDescription}
      />
      <Input
        label="Product URL"
        type="url"
        placeholder="https://"
        name="seo.productUrl"
        value={formik?.values?.seo?.productUrl}
        onChange={formik?.handleChange}
        error={formik?.errors?.seo?.productUrl}
      />
    </FormGroup>
  );
}
