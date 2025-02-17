import { stalemate } from "@/lib/fonts";

export const Logo = ({ logoSize, className = "" }) => {
  return (
    <div className={`${stalemate.className} select-none`}>
      <h1
        className={`font-bold text-[#373129] mt-2 ${className}`}
        style={{ fontSize: logoSize }}
      >
        Sche
        <span className="text-[#53ab8b]">dify</span>
      </h1>
    </div>
  );
};
