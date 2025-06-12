import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BuildingStorefrontIcon, UserIcon, GiftIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-uds-primary">UDS</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-uds-dark hover:text-uds-primary flex items-center">
              <HomeIcon className="h-5 w-5 mr-1" />
              Главная
            </Link>
            <Link to="/companies" className="text-uds-dark hover:text-uds-primary flex items-center">
              <BuildingStorefrontIcon className="h-5 w-5 mr-1" />
              Компании
            </Link>
            <Link to="/bonus" className="text-uds-dark hover:text-uds-primary flex items-center">
              <GiftIcon className="h-5 w-5 mr-1" />
              Бонусы
            </Link>
            <Link to="/profile" className="text-uds-dark hover:text-uds-primary flex items-center">
              <UserIcon className="h-5 w-5 mr-1" />
              Профиль
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 