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
import { DEFAULT_REDIRECT } from "@/lib/routes";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { TriangleAlert } from "lucide-react";

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
      callbackUrl: DEFAULT_REDIRECT,
    })
      .then(() => {
        if (provider === "github") toast.info("Continuing to github...");
        else toast.info("Continuing to Google...");
      })
      .catch(() => {
        toast.error("An unexpected error occurred");
      });
  };
  const searchParams = useSearchParams();
  const urlErr =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email linked with another provider. Plz use the correct one."
      : "";
  return (
    <Card
      className={`${inter.className} w-[400px] shadow flex flex-col bg-[#F4F6F8] dark:bg-[#0F1117]`}
    >
      <CardHeader>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{headerLabel}</h2>
            <p className="text-gray-600 text-sm w-64">{headerContent}</p>
          </div>
          <Image alt="Schedify" src="/assets/logo.png" width="50" height="50" />
        </div>
      </CardHeader>
      {urlErr && (
        <Alert variant="destructive" className="w-[350px] h-full mx-auto">
          <div className="flex items-center gap-2">
            <TriangleAlert className="w-12 h-12" />
            <div className="">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{urlErr}</AlertDescription>
            </div>
          </div>
        </Alert>
      )}
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
