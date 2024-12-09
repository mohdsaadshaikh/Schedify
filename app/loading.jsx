"use client";

import { stalemate } from "@/lib/fonts";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <h1
        className={`${stalemate.className} text-[#373129] motion-preset-blink  text-6xl`}
      >
        Sche
        <span className="text-[#53ab8b]">dify</span>
      </h1>
    </div>
  );
}
