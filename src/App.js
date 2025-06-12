import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Companies from './pages/Companies';
import Profile from './pages/Profile';
import Bonus from './pages/Bonus';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-uds-gray">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 