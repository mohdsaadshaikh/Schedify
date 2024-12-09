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
import PasswordInput from "@/components/ui/password-input";
import { register } from "@/lib/actions/auth.action";
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values) => {
    startTransition(() => {
      register(values)
        .then((res) => {
          if (res?.success) {
            toast.success("Accout successfully created");
            router.push(DEFAULT_REDIRECT);
          } else if (res?.error) {
            toast.error(res.error);
          }
        })
        .catch((error) => {
          toast.error("Failed to registering try again later");
        });
    });
  };

  return (
    <FormWrapper
      headerLabel="Create your account"
      headerContent="to continue to Schedify"
      backButtonLabel={
        <>
          Already have an account?<span className="text-[#157759]">Login</span>
        </>
      }
      backButtonLink="/login"
      providers={true}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[350px] mt-2"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="name" placeholder="John Doe" />
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
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
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
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full btn-gradient text-white font-semibold "
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};
