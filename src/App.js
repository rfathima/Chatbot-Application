import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './components/js/Dashboard';
import Profile from './components/js/Profile';
import ReportingPage from './components/js/ReportingPage';
import Chatbot from './components/js/Chatbot';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation(); // Get the current location
  return (
    <Routes>
      <Route path="" element={<Dashboard page="chatbot" pathname={location.pathname} />} />
      <Route path="/profile" element={<Dashboard page="profile" pathname={location.pathname} />} />
      <Route path="/reporting" element={<Dashboard page="reporting" pathname={location.pathname} />} />
      <Route path="/chatbot" element={<Chatbot />} />
    </Routes>
  );
};

export default App;
