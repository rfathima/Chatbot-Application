import React, { useState } from "react";
import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from "./DropdownUser";
//import LogoIcon from '../images/logo-icon.png';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-[999] flex w-full bg-gradient-to-b from-black shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between w-full px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-4">
        </div>

        <div className="hidden sm:invisible lg:invisible">
            <div className="relative">
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <svg
                  className="fill-current text-gray-600 dark:text-gray-400 hover:text-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.167 3.333a5.833 5.833 0 100 11.666 5.833 5.833 0 000-11.666zM1.667 9.167a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.286 13.286a1.167 1.167 0 111.648 1.648l-3.625 3.625a1.167 1.167 0 11-1.648-1.648l3.625-3.625z"
                    fill=""
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full pl-10 pr-4 bg-transparent text-black placeholder-gray-500 focus:outline-none dark:text-white xl:w-96"
              />
            </div>
        </div>

        <div className="flex items-center gap-4">
         <DarkModeSwitcher />
           <DropdownNotification />
          <DropdownMessage /> 
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
