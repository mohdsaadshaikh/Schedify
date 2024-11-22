"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { verifyEmail } from "@/lib/actions/auth.action";

const VerificationCard = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, setIsPending] = useState(false);
  const [progress, setProgress] = useState(0);

  const onSubmit = useCallback(() => {
    if (!token) {
      toast.error("Missing token");
      return;
    }

    setIsPending(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 90) return prev + 10;
        clearInterval(interval);
        return prev;
      });
    }, 200);

    verifyEmail(token)
      .then((response) => {
        setIsPending(false);
        setProgress(100);

        if (response?.success) {
          toast.success(response.success);
        } else if (response?.error) {
          toast.error(response.error);
        }
      })
      .catch(() => {
        setIsPending(false);
        setProgress(100);
        toast.error("An error occurred during verification. Please try again."); // Error toast
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        {isPending && (
          <>
            <h1 className="mt-5 text-xl font-medium text-gray-700">
              Verifying your account...
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              This may take a few moments.
            </p>
            <Progress value={progress} max={100} className="w-72 mt-4" />
          </>
        )}
        <Link href="/auth/login" passHref>
          <Button variant="link" className="mt-6">
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VerificationCard;
