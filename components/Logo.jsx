import { stalemate } from "@/lib/fonts";
import Link from "next/link";

export const Logo = () => {
  return (
    <div className={`${stalemate.className} select-none`}>
      <Link href="/">
        <h1 className="font-bold text-[40px] text-[#373129] mt-2">
          Sche
          <span className="text-[#53ab8b]">dify</span>
        </h1>
      </Link>
    </div>
  );
};
