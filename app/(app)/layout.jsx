import { Navbar } from "@/components/Navbar";
import { outfit } from "@/lib/fonts";

const AppLayout = ({ children }) => {
  return (
    <>
      <div className={`${outfit.className} overflow-x-clip`}>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default AppLayout;
