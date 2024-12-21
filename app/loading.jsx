"use client";

import { Loader } from "@/components/loader";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}
