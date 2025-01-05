"use client";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PasswordInput from "@/components/ui/password-input";
import { login } from "@/lib/actions/auth.action";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [show2fa, setShow2fa] = useState(false);

  const onSubmit = (values) => {
    startTransition(() => {
      login(values)
        .then((res) => {
          if (res?.success) {
            toast.success("Logged in successfully");
            router.push(DEFAULT_REDIRECT);
          } else if (res?.isTwoFactor) {
            setShow2fa(true);
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
      headerLabel={show2fa ? "Check your Email" : "Login"}
      headerContent={
        show2fa
          ? "we send a Two Factor Authentication code to your email"
          : "to continue to Schedify"
      }
      backButtonLabel={
        <>
          Don’t have an account?<span className="text-[#157759]">Sign up</span>
        </>
      }
      backButtonLink="/register"
      providers={!show2fa}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-[350px] mt-2"
        >
          <div className={`${show2fa && "mb-2"} space-y-4`}>
            {show2fa ? (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2FA Code</FormLabel>
                    <FormControl disabled={isPending}>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex-grow w-full">
                          <InputOTPSlot className="w-full" index={0} />
                          <InputOTPSlot className="w-full" index={1} />
                          <InputOTPSlot className="w-full" index={2} />
                          <InputOTPSlot className="w-full" index={3} />
                          <InputOTPSlot className="w-full" index={4} />
                          <InputOTPSlot className="w-full" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <>
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
                      <FormMessage />
                      <Button
                        size="sm"
                        variant="link"
                        className="p-0 mtext-[13px] text-[#1DA1F2] w-full flex justify-end "
                        asChild
                      >
                        <Link href="/forgot-password">Forgot Password?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
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
