import React from "react";

const Header = () => {
  return (
    <header className=" fixed w-full top-0 left-0 right-0 items-center px-10 pt-2 pb-4 bg-sky z-[999]">
      <div className="flex items-center">
        <h1 className="text-sm font-logo cursor-pointer text-navy">Calikan</h1>
      </div>
    </header>
  );
};

export default Header;
