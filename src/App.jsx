// Inside src/PersonalWebsite.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HurricaneSandyPage from './pages/HurricaneSandyPage'; // Add this import
import Research from './pages/Research';
// ... your other imports

export default function PersonalWebsite() {
  return (
    <Router>
      <Routes>
        {/* Your other routes */}
        <Route path="/research" element={<Research />} />
        
        {/* Add the new route for your Sandy project */}
        <Route path="/research/hurricane-sandy" element={<HurricaneSandyPage />} />
      </Routes>
    </Router>
  );
}
