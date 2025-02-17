"use client";

import { Logo } from "./Logo";

export function Loader({ size }) {
  return (
    // <h1
    // className={`${stalemate.className} text-[#373129] motion-preset-blink  text-6xl`}
    // >
    //   Sche
    //   <span className="text-[#53ab8b]">dify</span>
    // </h1>
    <Logo logoSize={size} className="motion-preset-blink" />
  );
}
