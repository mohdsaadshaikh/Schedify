import { Navbar } from "@/components/Navbar";
import { inter } from "@/lib/fonts";

const AppLayout = ({ children }) => {
  return (
    <>
      <div className={`${inter.className} overflow-hidden`}>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default AppLayout;
