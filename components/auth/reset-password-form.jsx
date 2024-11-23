"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormWrapper } from "@/components/auth/form-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import PasswordInput from "@/components/ui/password-input";
import { toast } from "sonner";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { FaArrowLeft } from "react-icons/fa";
import { resetPasswordSchema } from "@/schemas/auth.schema";
import { resetPassword } from "@/lib/actions/auth.action";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values) => {
    startTransition(() => {
      resetPassword(values, token)
        .then((response) => {
          if (response?.success) {
            toast.success(response.success);
            router.push("/login");
          } else if (response?.error) {
            toast.error(response.error);
          }
        })
        .catch(() => {
          toast.error("An unexpected error accured");
        });
    });
  };

  return (
    <FormWrapper
      headerLabel="Set new password"
      headerContent="New password must be different"
      backButtonLabel={
        <>
          <span className="flex gap-3 items-center">
            <FaArrowLeft />
            Back to Login
          </span>
        </>
      }
      backButtonLink="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[350px] mt-2"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full btn-gradient text-white font-semibold "
          >
            {isPending ? "Reseting..." : "Reset"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
