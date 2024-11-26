const ProfileLayout = ({ children }) => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center">
        <div className="px-6 py-4 w-[35vw] max-lg:w-[60vw] max-md:w-[80vw] max-sm:w-screen">
          {children}
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
