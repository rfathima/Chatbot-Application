import React, { useState, useEffect, useRef } from "react";
import data from "../utils/data.json";
import sendIcon from "../images/sendIcon.png";
import voiceAssistance from "../images/voiceAssistance.png";

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const inputRef = useRef(null); // Reference to the input field
  const chatBodyRef = useRef(null); // Reference to the chat body element

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

  const startVoiceAssistance = () => {
    if (!speechRecognition) return;

    speechRecognition.start(); // Start speech recognition
    console.log("start voice");
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (question.trim() === '') {
      return;
    }

    const userInput = question.toLowerCase(); // Convert user input to lowercase for case-insensitive comparison

    const invalidKeywords = ["what", "is", "a", "the", "of"];

    // Check if the user input matches any of the invalid keywords exactly
    const containsInvalidKeyword = invalidKeywords.includes(userInput.trim());

    let response;

    // If user input contains invalid keyword, set response to "Enter a different word"
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white shadow-md dark:bg-gray-800">
      <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-md overflow-hidden ">
        <div ref={chatBodyRef} className="p-8 h-80 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
            {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-2 ${chat.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`p-2 rounded-lg ${chat.sender === 'user' ? 'bg-green-200' : 'bg-gray-200'} inline-block`}>
                    <p>{chat.text}</p>
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
            className="w-full p-4 border border-gray-300 rounded-lg"
          />
          <button type="button" onClick={startVoiceAssistance} className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-transparent border-none">
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
