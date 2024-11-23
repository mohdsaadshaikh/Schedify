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
import { forgotPassword } from "@/lib/actions/auth.action";
import { forgotPasswordSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";

export const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState(null);

  const onSubmit = (values) => {
    startTransition(() => {
      setEmail(values);
      console.log(values);
      forgotPassword(values)
        .then((res) => {
          if (res?.success) {
            toast.success(res.success);
            setIsSubmitted(true);
          } else if (res?.error) {
            toast.error(res.error);
          }
        })
        .catch((error) => {
          toast.error("An unexpected error occurred");
        });
    });
  };

  const onResend = () => {
    startTransition(() => {
      console.log(form.getValues());
      forgotPassword(form.getValues())
        .then(() => toast.success("Password reset email resent successfully"))
        .catch(() => toast.error("An unexpected error occurred"));
    });
  };

  return (
    <FormWrapper
      headerLabel={isSubmitted ? "Check your email" : "Forgot Password?"}
      headerContent={
        isSubmitted
          ? "We've sent a password reset link to your email."
          : "Enter your email address to receive the reset link."
      }
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
      {isSubmitted ? (
        <Button
          onClick={onResend}
          disabled={isPending}
          className="w-full btn-gradient text-white font-semibold"
        >
          {isPending ? "Resending..." : "Resend"}
        </Button>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-[350px] mt-2"
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
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full btn-gradient text-white font-semibold "
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      )}
    </FormWrapper>
  );
};
