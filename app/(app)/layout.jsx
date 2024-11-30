import { Navbar } from "@/components/Navbar";
import { inter } from "@/lib/fonts";

const AppLayout = ({ children }) => {
  return (
    <>
      <div className={`${inter.className} overflow-x-clip`}>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default AppLayout;
