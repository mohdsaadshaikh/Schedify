import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <Image
        src="/assets/404-Svg.svg"
        alt="404 Not Found"
        className="w-full max-w-md"
        height="250"
        width="250"
        priority
      />
      <h1 className="mt-6 text-3xl font-bold text-gray-800">
        Oops! Page Not Found
      </h1>
      <p className="mt-2 text-gray-600">
        The page you’re looking for doesn’t exist or was removed.
      </p>
      <Button className="mt-6 btn-gradient text-white font-semibold px-6 py-3 w-64">
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  );
};
