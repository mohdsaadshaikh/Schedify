"use client";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import { logout } from "@/lib/actions/auth.action";
import { BellIcon, EditIcon, LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { NotificationList } from "./notification-ui/notification-list";
export const Navbar = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const handleLogout = () => {
    logout().then(() => {
      router.push("/login");
      toast.success("Logged out successfully!");
    });
  };

  return (
    <nav className="h-[10vh] w-screen flex justify-between items-center px-10 shadow dark:shadow-gray-800">
      <Logo />
      <div className="flex gap-4 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <BellIcon />
              {/* {notifications.length > 0 && (
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500"></span>
              )} */}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <NotificationList />
          </PopoverContent>
        </Popover>
        <ToggleTheme />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar
              size="sm"
              className="rounded-md"
              fallback={<AvatarFallback />}
            >
              <AvatarImage src={user?.image || null} alt="User avatar" />
              <AvatarFallback className="bg-[#53ab8b]">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-30" align="end">
            <DropdownMenuItem>
              <Link href="/profile">
                <span className="flex gap-3 cursor-pointer">
                  <User />
                  Profile
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile/edit">
                <span className="flex gap-3 cursor-pointer">
                  <EditIcon /> Edit Profile
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <span className="cursor-pointer flex gap-3">
                <LogOutIcon />
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
