import { NotFoundPage } from "@/components/not-found-page";
import React from "react";

export const metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you are looking for does not exist or has been removed. Return to the homepage.",
  keywords: ["404", "Page Not Found", "Error Page", "Not Found"],
  robots: "noindex, nofollow",
};

const NotFound = () => {
  return <NotFoundPage />;
};

export default NotFound;
