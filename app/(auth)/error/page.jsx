import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { stalemate } from "@/lib/fonts";

const AuthErrPage = () => {
  return (
    <div className=" flex items-center justify-center h-screen">
      <div className="w-[400px] text-center">
        <h1 className={`${stalemate.className} text-8xl text-gray-800 mb-4`}>
          OOPS!
        </h1>
        <p className="text-gray-600 mb-4">
          {process.env.NODE_ENV === "production"
            ? "Something went wrong"
            : "There is a problem with the server configuration.Check the server logs for more information."}
        </p>
        <Link href="/auth/login" passHref>
          <Button
            size="lg"
            className="w-full text-rose-500 text-xl"
            variant="link"
          >
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AuthErrPage;
