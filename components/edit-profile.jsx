"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import { FaUser } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { editProfileSchema } from "@/schemas/auth.schema";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export const EditProfile = () => {
  const user = useCurrentUser();
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      password: "12345678",
      isTwoFactorEnabled: user?.isTwoFactorEnabled,
    },
  });

  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-gray-700 dark:text-gray-200">
          My Profile
        </h1>
        <p className="text-sm text-gray-400">Manage your Profile Settings</p>
      </div>
      <div className="flex justify-center flex-col gap-4 mt-10">
        <p className="text-base">Your Profile picture</p>
        <div className="flex items-center gap-10 ">
          <Avatar className="w-36 h-36" fallback={<AvatarFallback />}>
            <AvatarImage
              className="w-36 h-36"
              src={user?.image || null}
              alt="User avatar"
            />
            <AvatarFallback className="bg-[#53ab8b]">
              <FaUser className="text-white w-20 h-20" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-3 w-48">
            <Button variant="outline">Change Photo</Button>
            <Button variant="destructive">Remove Photo</Button>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit()} className="space-y-4 w-full mt-8">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Switch id="two-factor" {...field} />
                      <Label htmlFor="two-factor">
                        Two Factor Authentication
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button disabled={isPending} variant="outline" className="w-28">
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isPending} className="w-28">
                {isPending ? "Editing..." : "Edit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
