import React from 'react';
import chatIcon from '../images/logo-chat-color.png';

const ChatbotToggleButton = ({ toggleChatbot }) => {
  return (
    <button onClick={toggleChatbot} className="fixed bottom-6 right-6 bg-white p-5 rounded-full border-solid border-4 border-red-600 shadow-lg">
      <img src={chatIcon} alt="Chat" className="w-[30px] h-[30px]" />
    </button>
  );
};

export default ChatbotToggleButton;
