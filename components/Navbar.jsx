"use client";
import React from "react";
import { Logo } from "@/components/Logo";
import { ToggleTheme } from "@/components/ui/toggle-theme";

export const Navbar = () => {
  return (
    <nav className="h-[10vh] w-screen flex justify-between items-center px-10 shadow dark:shadow-gray-800">
      <Logo />
      <ToggleTheme />
    </nav>
  );
};
