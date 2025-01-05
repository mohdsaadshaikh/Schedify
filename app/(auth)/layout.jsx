import { inter } from "@/lib/fonts";

const AuthLayout = ({ children }) => {
  return (
    <div
      className={`${inter.className} w-screen h-screen flex justify-center items-center`}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
