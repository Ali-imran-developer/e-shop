import { useState, useTransition } from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import { Badge } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { useCreateQueryString } from "@hooks/use-create-query-string";
import SimpleBar from "@ui/simplebar";

export function TabList({
  tabs,
  setActiveTab,
  activeTab,
  updateParams,
  selectTab,
}: any) {
  const [isPending, startTransition] = useTransition();

  return (
    <SimpleBar>
      <nav className="flex items-center gap-5 border-b border-gray-300">
        {tabs.map((nav: any) => (
          <TabButton
            item={nav}
            key={nav.value}
            isActive={activeTab === nav.value}
            onClick={() => selectTab(nav.value)}
            disabled={isPending}
          />
        ))}
      </nav>
    </SimpleBar>
  );
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    value: string;
    label: string;
    count: number;
  };
  isActive?: boolean;
  onClick: () => void;
}
export function TabButton({
  item,
  isActive,
  onClick,
  ...props
}: TabButtonProps) {
  const { createQueryString } = useCreateQueryString();

  const handleClick = () => {
    return onClick();
  };

  // console.log('data', data);

  return (
    <button
      className={cn(
        "relative flex items-center gap-2 py-2 text-sm outline-none",
        isActive
          ? "font-medium text-gray-900"
          : "text-gray-500 hover:text-gray-800"
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="whitespace-nowrap">{item.label}</span>
      {/* <Badge size="sm" variant={isActive ? "solid" : "flat"}>
        {item.count}
      </Badge> */}
      <span
        className={cn(
          "absolute -bottom-px left-0 h-0.5 w-full",
          isActive ? "bg-primary" : "bg-transparent"
        )}
      />
    </button>
  );
}
