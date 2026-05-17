import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PersonalWebsite from './PersonalWebsite.jsx';

export default function App() {
  return (
    <Routes>
      {/* Send literally every link directly to your main layout component */}
      <Route path="/*" element={<PersonalWebsite />} />
    </Routes>
  );
}
