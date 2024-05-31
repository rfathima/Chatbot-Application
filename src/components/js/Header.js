import React from 'react';
import { FaBars } from 'react-icons/fa';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from "./DropdownUser";
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = ({ toggleSidebar, isSidebarOpen  }) => {
  return (
    <header className="sticky top-0 z-[999] flex w-full bg-gradient-to-b from-black shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between w-full px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-white focus:outline-none lg:hidden">
            <FaBars />
          </button>
        </div>
        {!isSidebarOpen && (
        <div className="flex items-center gap-4 ">
          <DarkModeSwitcher />
          <DropdownNotification />
          <DropdownMessage />
          <DropdownUser />
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
