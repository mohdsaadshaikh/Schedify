"use client";

import { stalemate } from "@/lib/fonts";

export function Loader() {
  return (
    <h1
      className={`${stalemate.className} text-[#373129] motion-preset-blink  text-6xl`}
    >
      Sche
      <span className="text-[#53ab8b]">dify</span>
    </h1>
  );
}
