import { useState } from "react";
import { Input, Button } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import FormGroup from "@shared/form-group";
import { PiTagBold, PiXBold } from "react-icons/pi";

interface ProductTagsProps {
  className?: string;
  formik: any;
}

export default function ProductTags({ className, formik }: ProductTagsProps) {
  const [tags, setTags] = useState<string[]>(formik.values.tags || []);

  function handleAddTag(tag: string): void {
    if (tag.trim() !== "") {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      formik.setFieldValue("tags", updatedTags);
    }
  }

  function handleRemoveTag(tag: string): void {
    const updatedTags = tags.filter((item) => item !== tag);
    setTags(updatedTags);
    formik.setFieldValue("tags", updatedTags);
  }

  return (
    // <FormGroup
    //   title="Product Tags"
    //   description="Add your product's tag or category here"
    //   className={cn(className)}
    // >
      <ItemCrud name="Tag" items={tags} onAdd={handleAddTag} onRemove={handleRemoveTag} />
    // </FormGroup>
  );
}

interface ItemCrudProps {
  name: string;
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
}

function ItemCrud({ name, items, onAdd, onRemove }: ItemCrudProps): JSX.Element {
  const [itemText, setItemText] = useState<string>("");

  return (
    <div>
      <div className="flex items-center">
        <Input
          value={itemText}
          placeholder={`Enter a ${name}`}
          onChange={(e) => setItemText(e.target.value)}
          prefix={<PiTagBold className="h-4 w-4" />}
          className="w-full"
        />
        <Button
          onClick={() => {
            if (itemText.trim() !== "") {
              onAdd(itemText);
              setItemText("");
            }
          }}
          className="ms-4 shrink-0 text-sm @lg:ms-5"
        >
          Add {name}
        </Button>
      </div>

      {items.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((text, index) => (
            <div
              key={index}
              className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
            >
              {text}
              <button
                onClick={() => onRemove(text)}
                className="ps-2 text-gray-500 hover:text-gray-900"
              >
                <PiXBold className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
