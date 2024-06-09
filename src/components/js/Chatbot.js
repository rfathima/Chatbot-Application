import React, { useState, useEffect, useRef } from "react";
import data from "../utils/data.json";
import sendIcon from "../images/sendIcon.png";
import voiceAssistance from "../images/voiceAssistance.png";
import closeIcon from "../images/close-icon.png"; // Import the close icon image
import { useLocation } from "react-router-dom";
 
const Chatbot = ({ toggleChatWindow }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [voiceAssistanceActive, setVoiceAssistanceActive] = useState(false);
  const inputRef = useRef(null); // Reference to the input field
  const chatBodyRef = useRef(null); // Reference to the chat body element
  const location = useLocation();
  const user = "Razul"; // Static user name
 
  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition
    recognition.lang = 'en-US'; // Set recognition language
    recognition.continuous = false; // Stop recognition after first speech input
    recognition.onresult = handleSpeechResult; // Handle recognition result
    setSpeechRecognition(recognition); // Set speech recognition object in state
  }, []);
 
  useEffect(() => {
    // Focus the input field when the component mounts or chat history updates
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Scroll to the bottom of the chat window when chat history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);
 
  const handleSpeechResult = (event) => {
    const transcript = event.results[0][0].transcript;
    setQuestion(transcript); // Set the spoken text as the question
    handleSubmit(event); // Automatically submit the spoken question
  };
 
  const toggleVoiceAssistance = () => {
    if (!speechRecognition) return;
 
    if (!voiceAssistanceActive) {
      speechRecognition.start(); // Start speech recognition
    } else {
      speechRecognition.stop(); // Stop speech recognition
    }
 
    setVoiceAssistanceActive(!voiceAssistanceActive); // Toggle voice assistance state
  };
 
  const handleChange = (event) => {
    setQuestion(event.target.value);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (question.trim() === '') {
      return;
    }
 
    const userInput = question.toLowerCase(); // Convert user input to lowercase for case-insensitive comparison
 
    const invalidKeywords = ["what", "is", "a", "the", "of", "i", "you"];
 
    // Check if the user input matches any of the invalid keywords exactly
    const containsInvalidKeyword = invalidKeywords.includes(userInput.trim());
 
    let response;
 
    // If user input contains invalid keyword, set response to "Enter a different word."
    if (containsInvalidKeyword) {
      response = "Please enter a different word.";
    } else {
      // Search for a match between user input and questions in the JSON data
      const foundQuestion = data.find(item => userInput.includes(item.question.toLowerCase()) || item.question.toLowerCase().includes(userInput));
 
      // If a matching question is found, use its answer as the response
      if (foundQuestion) {
        response = foundQuestion.answer;
      } else {
        response = "I'm not sure about that.";
      }
    }
 
    // Update chat history with the response
    setChatHistory([...chatHistory, { sender: 'user', text: question }, { sender: 'bot', text: response }]);
    setQuestion('');
 
    // Send question, answer, and user to the backend
    try {
      await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, question, answer: response }),
      });
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };
 
  const handleClose = () => {
    if (toggleChatWindow) {
      toggleChatWindow();
    }
  };
 
  return (
    <div className={`flex flex-col items-center justify-center ${location.pathname === "/" ? 'fixed bottom-1 w-[80%] bg-gradient-to-b from-black-600 shadow-md' : 'fixed bottom-4 right-4 bg-gradient-to-b from-white shadow-md dark:bg-gray-800 '}`}>
      <div className={`relative ${location.pathname === "/" ? 'h-3/4 w-3/4' : 'h-full w-80 lg:w-96'} bg-white rounded-lg shadow-md overflow-hidden`}>
        {location.pathname !== "/" && (
          <button onClick={handleClose} className="absolute top-4 right-4 bg-transparent border-none">
            <img src={closeIcon} alt="Close" className="w-6 h-6" />
          </button>
        )}
        <div ref={chatBodyRef} className="p-10 h-80 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {chatHistory.map((chat, index) => (
            <div key={index} className={`mb-2 ${chat.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`p-2 rounded-lg ${chat.sender === 'user' ? 'bg-green-200' : 'bg-gray-200'} inline-block`}>
                <p className="break-all">{chat.text}</p>
              </div>
            </div>
          ))}
          <div ref={chatBodyRef}></div>
        </div>
        <form onSubmit={handleSubmit} className="relative p-4 bg-gray-100">
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={handleChange}
            className={`p-4 border border-gray-300 rounded-lg  ${location.pathname === "/" ? 'w-full ' : 'lg:w-3/4 w-2/3'}`}
          />
          <button type="button" onClick={toggleVoiceAssistance} className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
            <img src={voiceAssistance} alt="Voice" className="w-6 h-6 m-2" />
          </button>
          <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
            <img src={sendIcon} alt="Send" className="w-10 h-10 m-2" />
          </button>
        </form>
      </div>
    </div>
  );
};
 
export default Chatbot;