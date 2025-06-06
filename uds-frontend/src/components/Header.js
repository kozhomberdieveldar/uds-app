import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ backgroundColor: '#6a1b9a', padding: '10px', color: 'white', display: 'flex', alignItems: 'center' }}>
      <img
        src="/images/uds-logo.png"
        alt="UDS App"
        style={{ width: '40px', height: '40px', marginRight: '15px' }}
      />
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Главная</Link>
        <Link to="/clients" style={{ color: 'white', marginRight: '15px' }}>Клиенты</Link>
        <Link to="/login" style={{ color: 'white' }}>Войти</Link>
      </nav>
    </header>
  );
}

export default Header;
