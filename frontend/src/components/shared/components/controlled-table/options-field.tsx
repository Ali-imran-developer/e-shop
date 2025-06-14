import { Select, type SelectProps, type SelectOption } from "rizzui";
import cn from "@utils/helperFunctions/class-names";

export default function OptionsField({
  placeholder = "More Actions",
  dropdownClassName,
  ...props
}: SelectProps<SelectOption>) {
  return (
    <Select
      inPortal={false}
      placeholder={placeholder}
      selectClassName="h-9 min-w-[150px]"
      dropdownClassName={cn("p-1.5 !z-0", dropdownClassName)}
      optionClassName="h-9"
      className="placeholder:text-black"
      {...props}
    />
  );
}
