import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonalWebsite from './PersonalWebsite.jsx';
import Sandy from './pages/sandy.jsx'; 

export default function App() {
  return (
    <Routes>
      {/* Standalone route for your Hurricane Sandy analysis page */}
      <Route path="/sandy" element={<Sandy />} />
      
      {/* The wildcard "/*" passes all other portfolio paths (like /research, /experience, etc.)
          back to your main layout so they render with the navbar and theme styling intact! */}
      <Route path="/*" element={<PersonalWebsite />} />
    </Routes>
  );
}
