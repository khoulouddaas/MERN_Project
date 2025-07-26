import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DeveloperSignUp from './components/DeveloperSignUp';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main registration route */}
          <Route path="/register" element={<DeveloperSignUp />} />
          <Route path="/dev/register" element={<DeveloperSignUp />} />
          
          {/* Redirect root to register */}
          <Route path="/" element={<Navigate to="/register" replace />} />
          
          {/* You can add more routes here for login pages, etc. */}
          <Route path="/dev-login" element={<div>Developer Login Page (Coming Soon)</div>} />
          <Route path="/org-login" element={<div>Organization Login Page (Coming Soon)</div>} />
          <Route path="/org-signup" element={<div>Organization Signup Page (Coming Soon)</div>} />
          
          {/* 404 route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;