"use client";
import React from "react";
import { Logo } from "@/components/Logo";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { logout } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar size="sm" fallback={<AvatarFallback />}>
              <AvatarImage src={user?.image || null} alt="User avatar" />
              <AvatarFallback className="bg-[#53ab8b]">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <span className="cursor-pointer flex gap-2">
                <FaSignOutAlt className="w-4 h4 " />
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
