import { RadioGroup, AdvancedRadio } from "rizzui";
import { PiCheckCircleFill } from "react-icons/pi";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

const availabilityOptions = [
  { value: "online", name: "Only available online." },
  { value: "coming-soon", name: "Coming soon" },
  { value: "offline", name: "Only available offline." },
];

export default function ProductAvailability({ formik }: any) {
  return (
    <RadioGroup
      value={formik?.values?.availability}
      setValue={(value) => formik?.setFieldValue("availability", value)}
      className="col-span-full grid gap-4 @2xl:grid-cols-3 @4xl:gap-6"
    >
      {ensureArray(availabilityOptions).map((item: any) => (
        <AdvancedRadio
          key={item?.value}
          value={item?.value}
          contentClassName="px-4 py-6 flex items-center justify-between"
          inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200"
        >
          <span>{item?.name}</span>
          {/* <PiCheckCircleFill className="icon h-5 min-w-[1.25rem] text-primary" /> */}
        </AdvancedRadio>
      ))}
    </RadioGroup>
  );
}
