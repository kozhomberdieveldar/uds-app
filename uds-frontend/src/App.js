import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Login from './pages/Login';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingBottom: '56px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;


