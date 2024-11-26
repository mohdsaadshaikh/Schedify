"use client";
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
import PasswordInput from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { updatePasswordSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";
import { updatePassword } from "@/lib/actions/user.action";

export const ChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values) => {
    startTransition(() => {
      updatePassword(values)
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
      <h1 className="text-2xl font-extrabold text-gray-700 dark:text-gray-200">
        Change Password
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-8"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
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
                {isPending ? "Changing..." : "Change"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
