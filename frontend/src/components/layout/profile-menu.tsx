import { Title, Text, Avatar, Button, Popover } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { routes } from "@config/routes";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CALLBACK_STATUS } from "@config/enums";
import { useAuth } from "@hooks/auth-hooks";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { logout } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const { profileList } = useAppSelector(
    (state: { Profile: { profileList: { image?: string; name?: string } } }) =>
      state.Profile
  );
  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
            buttonClassName
          )}
        >
          <Avatar
            src={profileList?.image ?? ""}
            name={profileList?.name ?? ""}
            className={cn("!h-9 w-9 sm:!h-10 sm:!w-10", avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, Andry
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu profileList={profileList} />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const location = useLocation();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  {
    name: "Account Settings",
    href: routes.settings.forms.profileSettings,
  },
  {
    name: "Switch Accounts",
    //href: routes.settings.forms.profileSettings,
  },
  {
    name: "Activity Log",
    // href: "#",
  },
];

const DropdownMenu = ({ profileList }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try{
      setIsLoading(true);
      const response = await dispatch(logout()).unwrap();
      toast.success(response.message);
      navigate("/login");
    } catch(error: any){
      toast.error(error.message);
    } finally{
      setIsLoading(false);
    }    
  };

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar src={profileList?.image ?? ""} name={profileList?.name ?? ""} />
        <div className="ms-3 break-all">
          <Title as="h6" className="font-semibold">
            {profileList?.name}
          </Title>
          <Text className="text-gray-600 text-xs font-semibold ">
            {profileList?.email}
          </Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href || "#"}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 py-3   hover:dark:bg-gray-50/50">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 px-2.5 py-2  outline-none focus-within:text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-0"
          variant="text"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
