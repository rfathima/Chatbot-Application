import React, { useState } from 'react';
import { FaComments, FaChartBar, FaUser } from 'react-icons/fa'; // Importing icons
import Chatbot from './Chatbot';
import ReportingPage from './ReportingPage';
import faqPage from '../utils/data.json';
import Header from './Header';
import Logo from '../images/company-logo.png';
import Profile from './Profile';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [showChatbot, setShowChatbot] = useState(true); // Set initial state to true
  const [showReportingPage, setShowReportingPage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowChatbot(false);
    setShowReportingPage(false);
    setShowProfile(true);
  };

  const handleChatbotClick = () => {
    setShowChatbot(true);
    setShowReportingPage(false);
    setShowProfile(false);
  };

  const handleReportingPageClick = () => {
    setShowChatbot(false);
    setShowReportingPage(true);
    setShowProfile(false);
  };

  return (
    <div className="container-fluid">
      <div className="flex">
        <div className="w-[350px] bg-black min-h-screen sidebar">
          <div className='flex items-center justify-center pt-[50px]'>
            <img alt="company-logo" src={Logo} />
          </div>
          <div className="flex flex-col items-start pt-[50px] justify-center align-middle ml-5">
            <div onClick={handleChatbotClick} className={`mb-5 flex cursor-pointer ${showChatbot ? 'text-red-600  ' : ''}`}>              
              <button className="px-4 py-4 rounded-full bg-white hover:bg-gray-200 focus:outline-none flex items-center">
                <FaComments />
              </button>
              <div className='text-white flex items-center ml-3 font-medium hover:text-red-600'>Chatbot</div>
            </div>
            <div onClick={handleReportingPageClick} className={`mb-5 flex cursor-pointer ${showReportingPage ? 'text-red-600' : ''}`}>
              <button className="px-4 py-4 rounded-full bg-white hover:bg-gray-200 focus:outline-none flex items-center">
                <FaChartBar />
              </button>
              <div className='text-white flex items-center ml-3 font-medium hover:text-red-600'>ReportingPage</div>
            </div>
            <div onClick={handleProfileClick} className={`flex cursor-pointer ${showProfile ? 'text-red-600' : ''}`}>
              <button className="px-4 py-4 rounded-full bg-white hover:bg-gray-200 focus:outline-none flex items-center">
                <FaUser />
              </button>
              <Link to="/profile" className='flex justify-center'>
                <div className='text-white flex items-center ml-3 font-medium hover:text-red-600'>Profile</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-11/12">
          <div className="container">
            <Header />
            {showChatbot && <Chatbot faqPage={faqPage}/>}
            {showReportingPage && <ReportingPage />}
            {showProfile && <Profile />}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
