"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CardContent,
  Card,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { inter } from "@/lib/fonts";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export const FormWrapper = ({
  headerLabel,
  headerContent,
  children,
  backButtonLabel,
  backButtonLink,
  providers = false,
}) => {
  const providerHandler = (provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <Card
      className={`${inter.className} w-[400px] shadow flex flex-col bg-[#F4F6F8] dark:bg-[#0F1117]`}
    >
      <CardHeader>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">{headerLabel}</h2>
            <p className="text-gray-600 text-sm">{headerContent}</p>
          </div>
          <Image alt="Schedify" src="/assets/logo.png" width="50" height="50" />
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Link href={backButtonLink}>
          <Button variant="link" className="w-full -mt-4 mb-2">
            {backButtonLabel}
          </Button>
        </Link>
        {providers && (
          <div className="w-full flex gap-2 ">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => providerHandler("google")}
            >
              <FcGoogle /> Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => providerHandler("github")}
            >
              <FaGithub /> Github
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
