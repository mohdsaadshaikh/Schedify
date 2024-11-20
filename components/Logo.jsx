import { stalemate } from "@/lib/fonts";

export const Logo = () => {
  return (
    <div className={`${stalemate.className} `}>
      {/* <div className="flex justify-center items-center gap-1"> */}
      {/* <Image
        src="/assets/logo.png"
        alt="Schedify"
        width="50"
        height="50"
        //   className="relative top-0"
      /> */}
      <h1 className="font-bold text-[40px] text-[#373129] mt-2">
        Sche
        <span className="text-[#53ab8b]">dify</span>
      </h1>
    </div>
    // </div>
  );
};
