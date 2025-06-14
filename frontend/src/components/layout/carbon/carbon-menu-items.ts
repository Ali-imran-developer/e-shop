import { routes } from "@config/routes";
import { DUMMY_ID } from "@config/constants";
import { IconType } from "react-icons/lib";
import {
  PiAirplaneTiltDuotone,
  PiAppStoreLogoDuotone,
  PiBellSimpleRingingDuotone,
  PiBinocularsDuotone,
  PiBriefcaseDuotone,
  PiBrowserDuotone,
  PiCalendarDuotone,
  PiCalendarPlusDuotone,
  PiCardsDuotone,
  PiCaretCircleUpDownDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiChatCenteredDotsDuotone,
  PiCreditCardDuotone,
  PiCurrencyCircleDollarDuotone,
  PiCurrencyDollarDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiFeatherDuotone,
  PiFileImageDuotone,
  PiFolderLockDuotone,
  PiFolder,
  PiGridFourDuotone,
  PiHammerDuotone,
  PiHeadsetDuotone,
  PiHourglassSimpleDuotone,
  PiHouseLineDuotone,
  PiListNumbersDuotone,
  PiLockKeyDuotone,
  PiMagicWandDuotone,
  PiMapPinLineDuotone,
  PiNoteBlankDuotone,
  PiNotePencilDuotone,
  PiPackageDuotone,
  PiPokerChipDuotone,
  PiRocketLaunchDuotone,
  PiShieldCheckeredDuotone,
  PiShootingStarDuotone,
  PiShoppingCartDuotone,
  PiSquaresFourDuotone,
  PiStepsDuotone,
  PiTableDuotone,
  PiUserCircleDuotone,
  PiUserGearDuotone,
  PiUserPlusDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
  PiCodesandboxLogoDuotone,
  PiSparkleDuotone,
  PiArrowsOutLineHorizontalBold,
  PiPushPinDuotone,
  PiArrowsOut,
} from "react-icons/pi";
import { atom } from "jotai";
import ProjectWriteIcon from "@shared/components/icons/project-write";
import CrmDashIcon from "@shared/components/icons/crm-icon";
import AffiliateIcon from "@shared/components/icons/affiliate";

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}

export const carbonMenuItems: MenuItemsType[] = [
  {
    id: "1",
    name: "Dashboard",
    title: "Overview",
    icon: PiBrowserDuotone,
    menuItems: [
      {
        name: "File Manager",
        href: "/",
        icon: PiFolder,
      },
    ],
  },
];

export const carbonMenuItemAtom = atom(carbonMenuItems[0]);
