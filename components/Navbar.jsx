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
import { EditIcon, LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
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
      <div className="flex gap-6 items-center">
        <ToggleTheme />
        {/* <Popover>
          <PopoverTrigger asChild>
            <Avatar size="sm" fallback={<AvatarFallback />}>
              <AvatarImage src={user?.image || null} alt="User avatar" />
              <AvatarFallback className="bg-[#53ab8b]">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="border border-black dark:border-white shadow-md">
            <div className="flex gap-4 flex-col">
              <div className="flex flex-col gap-2 items-center">
                <Avatar size="sm" fallback={<AvatarFallback />}>
                  <AvatarImage src={user?.image || null} alt="User avatar" />
                  <AvatarFallback className="bg-[#53ab8b]">
                    <FaUser className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg font-semibold">{user?.name}</p>
              </div>
              <div className="flex justify-between">
                <Link href="/profile/edit">
                  <span className="cursor-pointer text-sm py-2 px-4 rounded-full underline">
                    Edit Profile
                  </span>
                </Link>
                <span
                  className="cursor-pointer flex gap-3"
                  onClick={handleLogout}
                >
                  <LogOutIcon />
                  Logout
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar size="sm" fallback={<AvatarFallback />}>
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
