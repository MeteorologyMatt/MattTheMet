import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonalWebsite from './PersonalWebsite.jsx';

// Import all of your sub-pages
import Home from './pages/Home.jsx';
import Experience from './pages/Experience.jsx';
import Research from './pages/Research.jsx';
import Contact from './pages/Contact.jsx';
import Survey from './pages/Survey.jsx';
import Sandy from './pages/sandy.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      {/* If PersonalWebsite acts as your full single-page landing layout */}
      <Route path="/" element={<PersonalWebsite />} />
      
      {/* Explicit routes for individual sub-pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/research" element={<Research />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/sandy" element={<Sandy />} />
      
      {/* Catch-all route for any typos or broken links */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
