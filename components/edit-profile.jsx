"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/useCurrentUse";
import { editProfileSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CldUploadWidget } from "next-cloudinary";
import {
  deleteImage,
  editProfile,
  uploadImage,
} from "@/lib/actions/user.action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const EditProfile = () => {
  const user = useCurrentUser();
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      email: user?.email || undefined,
      name: user?.name || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleDeleteImage = () => {
    startTransition(() => {
      deleteImage()
        .then((res) => {
          if (res?.success) {
            toast.success("Image deleted successfully");
          } else if (res?.error) {
            toast.error(res.error);
          }
        })
        .catch((err) => {
          console.error("Error deleting image", err);
          toast.error("Error deleting image");
        });
    });
  };

  const handleUploadImage = (imageUrl) => {
    startTransition(() => {
      uploadImage(imageUrl)
        .then((res) => {
          if (res?.success) {
            toast.success("Image uploaded successfully");
          } else if (res?.error) {
            toast.error(res.error);
          }
        })
        .catch((err) => {
          toast.error("Error uploading image");
        });
    });
  };

  const handleEditProfile = (values) => {
    startTransition(() => {
      editProfile(values)
        .then((response) => {
          if (response?.success) {
            toast.success(response.success);
          } else if (response?.error) {
            toast.error(response.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

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
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              options={{
                folder: "schedify",
                multiple: false,
                sources: ["local", "url", "camera", "google_drive"],
              }}
              onSuccess={(result, { widget }) => {
                handleUploadImage(result?.info?.secure_url);
              }}
              onQueuesEnd={(result, { widget }) => {
                widget.close();
              }}
            >
              {({ open }) => (
                <Button variant="outline" onClick={() => open()}>
                  {!user?.image ? "Add Photo" : "Change Photo"}
                </Button>
              )}
            </CldUploadWidget>
            <Button variant="destructive" onClick={() => handleDeleteImage()}>
              Remove Photo
            </Button>
          </div>
        </div>
        <p className="text-[13px] text-gray-600 mb-2">
          Please upload an image with a resolution of 512x512 pixels or below.
          The image will be cropped to a square.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEditProfile)}
          className="space-y-4 w-full mt-8"
        >
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
            {!user?.isOAuth && (
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-md border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Two Factor Authentication</FormLabel>
                      <FormDescription className="text-[13px]">
                        {user?.isTwoFactorEnabled
                          ? "Disable two-factor authentication if you dont want to secure you account"
                          : "Enable two-factor authentication to enhance your security and protect your account."}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        id="two-factor"
                        {...field}
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex justify-end gap-2 pb-4">
              <Button
                disabled={isPending}
                variant="outline"
                type="button"
                className="w-28"
              >
                <Link href="/">Cancel</Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="w-28 btn-gradient"
              >
                {isPending ? "Editing..." : "Edit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
