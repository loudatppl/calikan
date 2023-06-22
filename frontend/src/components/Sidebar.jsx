import React, { useState } from "react";

import { Link } from "react-router-dom";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { HiViewBoards, HiHome } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={` ${
        isOpen ? "w-60" : "w-[43px]"
      } relative h-screen bg-navy duration-300 p-2 pt-40`}
    >
      <div
        className="text-dblue absolute cursor-pointer 
        rounded-[50%] border border-dblue top-20 -right-3 bg-sky"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiChevronLeft size={26} /> : <FiChevronRight size={26} />}
      </div>
      <div className="text-sky text-base font-body cursor-pointer relative">
        <ul className="space-y-6 absolute">
          <li className="flex space-x-2 items-end">
            <HiHome size={26} />
            <Link to="/" className={`${!isOpen && "scale-0"} duration-100`}>
              Home
            </Link>
          </li>
          <li className="flex space-x-2 items-end">
            <HiViewBoards size={26} />
            <Link
              to="/boards"
              className={`${!isOpen && "scale-0"} duration-100`}
            >
              Boards
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
