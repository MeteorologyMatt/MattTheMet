import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalWebsite from './PersonalWebsite.jsx';
import Sandy from 'MattTheMet-backup/src/pages/sandy.jsx'; // Ensure this matches the exact folder and file name you created

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Your main portfolio loads at the default root path */}
        <Route path="/" element={<PersonalWebsite />} />
        
        {/* Your new Sandy analysis loads at /#/sandy */}
        <Route path="/sandy" element={<Sandy />} />
      </Routes>
    </Router>
  );
}
