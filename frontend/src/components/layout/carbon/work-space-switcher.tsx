import { Text, Avatar, Select, type SelectOption } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { useAppSelector } from "@/hooks/store-hook";

export default function WorkSpaceSwitcher({
  className,
  selectClassName,
  dropdownClassName,
  suffixClassName,
}: {
  className?: string;
  selectClassName?: string;
  dropdownClassName?: string;
  suffixClassName?: string;
}) {
  const { profileList } = useAppSelector((state) => state.Profile as { profileList: { name?: string; image?: string } });
  
  return (
    // <Select
    //   options={customOptions}
    //   value={value}
    //   onChange={setValue}
    //   displayValue={(value: SelectOption) => renderDisplayValue(value)}
    //   getOptionDisplayValue={(option) => renderOptionDisplayValue(option)}
    //   selectClassName={cn(
    //     "h-16 outline-0 border-2 ring-0 border-gray-100 hover:!border-gray-100 hover:!ring-0 focus:border-gray-100 focus:!ring-0",
    //     selectClassName
    //   )}
    //   className={cn(className)}
    //   dropdownClassName={cn("z-[9999] max-w-[250px]", dropdownClassName)}
    //   suffixClassName={suffixClassName}
    //   optionClassName={cn("dark:hover:bg-gray-300")}
    // />
    <div className="px-5 pb-3.5 pt-3.5">
      <div
        className={cn(
          "h-16   outline-0 border-2 ring-0 border-gray-100 rounded-md hover:!border-gray-100 hover:!ring-0 focus:border-gray-100 focus:!ring-0",
          selectClassName
        )}
      >
        <div className="flex items-center gap-3 h-full px-3">
          <Avatar
            src={profileList?.image ?? ""}
            name={profileList?.name ?? ""}
            className={cn("!h-9 w-9 sm:!h-10 sm:!w-10")}
          />
          <div>
            <Text fontWeight="medium" className="text-gray-900">
              My Account
            </Text>
            <Text className="text-gray-500 text-xs font-semibold break-all ">
              {profileList?.name ?? ""}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderDisplayValue(value: SelectOption) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={value?.label} src={value?.avatar} size="sm" />
      <div>
        <Text fontWeight="medium" className="text-gray-900">
          {value.label}
        </Text>
        <Text className="text-gray-500">Select Workspace</Text>
      </div>
    </div>
  );
}

function renderOptionDisplayValue(option: SelectOption) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={option.label} src={option.avatar} size="sm" />
      <div>
        <Text fontWeight="medium">{option.label}</Text>
        <Text>{option.value}</Text>
      </div>
    </div>
  );
}
