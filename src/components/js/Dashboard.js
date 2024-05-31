import React, { useState, useEffect } from 'react';
import { FaComments, FaChartBar, FaUser } from 'react-icons/fa';
import Chatbot from './Chatbot';
import ReportingPage from './ReportingPage';
import Header from './Header';
import Logo from '../images/logo_main_small.png';
import Profile from './Profile';
import ChatbotToggleButton from './ChatbotToggleButton';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = ({ page, pathname }) => {
  const [showChatbot, setShowChatbot] = useState(page === 'chatbot');
  const [showReportingPage, setShowReportingPage] = useState(page === 'reporting');
  const [showProfile, setShowProfile] = useState(page === 'profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to false for small screens  
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (page === 'profile') {
      setShowProfile(true);
      setShowChatbot(false);
      setShowReportingPage(false);
    } else if (page === 'reporting') {
      setShowReportingPage(true);
      setShowChatbot(false);
      setShowProfile(false);
    } else {
      setShowChatbot(true);
      setShowReportingPage(false);
      setShowProfile(false);
    }
  }, [page]);

  const handleProfileClick = () => {
    navigate('/profile');
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleChatbotClick = () => {
    navigate('/');
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const handleReportingPageClick = () => {
    navigate('/reporting');
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleChatbotVisibility = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className="container-fluid">
      <div className="flex">
        <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isSidebarOpen ? 'block' : 'hidden'} lg:hidden`} onClick={toggleSidebar}></div>
        <div className={`fixed z-50 lg:relative w-[330px] bg-black min-h-screen sidebar transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex items-center justify-start pt-[50px]">
            <img className='w-[150px] ml-4 lg:ml-[25px] mt-4 lg:mt-0' alt="company-logo" src={Logo} />
          </div>
          <div className="flex flex-col items-start pt-10 lg:pt-[50px] justify-center align-middle ml-5">
            <div onClick={handleChatbotClick} className={`mb-5 flex cursor-pointer ${showChatbot ? 'text-red-600' : ''}`}>
              <button className="px-4 py-4 rounded-full bg-white hover:bg-gray-200 focus:outline-none flex items-center">
                <FaComments />
              </button>
              <div className="text-white flex items-center ml-3 font-medium hover:text-red-600">Chatbot</div>
            </div>
            <div onClick={handleReportingPageClick} className={`mb-5 flex cursor-pointer ${showReportingPage ? 'text-red-600' : ''}`}>
              <button className="px-4 py-4 rounded-full bg-white hover:bg-gray-200 focus:outline-none flex items-center">
                <FaChartBar />
              </button>
              <div className="text-white flex items-center ml-3 font-medium hover:text-red-600">Reporting Page</div>
            </div>
            <div onClick={handleProfileClick} className={`flex cursor-pointer ${showProfile ? 'text-red-600' : ''}`}>
              <button className="px-4 py-4 rounded-full bg-white hover:bg-gray-200 focus:outline-none flex items-center">
                <FaUser />
              </button>
              <Link to="/profile" className="flex justify-center">
                <div className="text-white flex items-center ml-3 font-medium hover:text-red-600">Profile</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-11/12 relative">
          <div className="container">
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            {showChatbot && <Chatbot toggleChatWindow={toggleChatbotVisibility} />}
            {showReportingPage && <ReportingPage />}
            {showProfile && <Profile />}
          </div>
          {pathname !== '/' && (
            <>
              <ChatbotToggleButton toggleChatbot={toggleChatbotVisibility} />
              {isChatbotVisible && (
                <div className="fixed bottom-0 z-30 right-0 w-1/2 h-3/4">
                  <Chatbot toggleChatWindow={toggleChatbotVisibility} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
