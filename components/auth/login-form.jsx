"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
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
import { loginSchema } from "@/schemas/auth.schema";
import { login } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { DEFAULT_REDIRECT } from "@/lib/routes";

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values) => {
    startTransition(() => {
      login(values)
        .then((res) => {
          if (res?.success) {
            toast.success("Logged in successfully");
            router.push(DEFAULT_REDIRECT);
          } else if (res?.message) {
            toast.info(res.message);
          } else if (res?.error) {
            toast.error(res.error);
          }
        })
        .catch((error) => {
          toast.error("Failed to login try again later");
        });
    });
  };

  return (
    <FormWrapper
      headerLabel="Login"
      headerContent="to continue to Schedify"
      backButtonLabel={
        <>
          Don’t have an account?<span className="text-[#157759]">Sign up</span>
        </>
      }
      backButtonLink="/register"
      providers={true}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[350px] mt-2"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    className="p-0 text-[13px] text-[#1DA1F2] w-full flex justify-end "
                    asChild
                  >
                    <Link href="/forgot-password">Forgot Password?</Link>
                  </Button>
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
            {isPending ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
