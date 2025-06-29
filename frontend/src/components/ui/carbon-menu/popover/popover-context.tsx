import { PortalProps } from "@shared/components/Portal";
import { FloatingPosition } from "./types";
import { PopoverWidth } from "./use-popover";
import { createContextHook } from "./create-custom-context";

interface PopoverContextProps {
  x: number;
  y: number;
  opened: boolean;
  reference: (node: HTMLElement) => void;
  floating: (node: HTMLElement) => void;
  width?: PopoverWidth;
  trapFocus: boolean | undefined;
  placement: FloatingPosition;
  withinPortal: boolean | undefined;
  portalProps?: Omit<PortalProps, "children">;
  onClose?: () => void;
  getDropdownId: () => string;
  getTargetId: () => string;
  controlled: boolean;
  onToggle: () => void;
  withRoles: boolean | undefined;
  targetProps: Record<string, any>;
  disabled: boolean | undefined;
  classNames: string | undefined;
  as: string;
  closeOnEscape?: boolean | undefined;
  returnFocus?: boolean | undefined;
  keepMounted?: boolean | undefined;
}

export const [PopoverContextProvider, usePopoverContext] =
  createContextHook<PopoverContextProps>(
    "Popover component was not found in the tree"
  );
