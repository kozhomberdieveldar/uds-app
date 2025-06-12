import React, { useState, useEffect } from 'react';
import { authAPI, bonusAPI, companiesAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [bonusResponse, companiesResponse] = await Promise.all([
        bonusAPI.getTotalBonus(),
        companiesAPI.getCompanies()
      ]);

      // В реальном приложении здесь должен быть запрос к API для получения данных пользователя
      setUser({
        name: 'Иван Иванов', // Временные данные
        phone: '+7 (999) 123-45-67',
        email: 'ivan@example.com',
        joinedDate: new Date().toLocaleDateString('ru-RU'),
        totalBonus: bonusResponse.data.total,
        connectedCompanies: companiesResponse.data.length,
      });
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке данных');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    // Здесь должен быть запрос к API для сохранения настройки
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Здесь должен быть запрос к API для сохранения настройки
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uds-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-uds-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-uds-gray rounded-lg">
            <p className="text-sm text-gray-600">Всего бонусов</p>
            <p className="text-xl font-semibold">{user.totalBonus}</p>
          </div>
          <div className="p-4 bg-uds-gray rounded-lg">
            <p className="text-sm text-gray-600">Подключенных компаний</p>
            <p className="text-xl font-semibold">{user.connectedCompanies}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button className="text-uds-primary hover:text-uds-secondary">
              Изменить
            </button>
          </div>

          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-semibold">Телефон</p>
              <p className="text-sm text-gray-600">{user.phone}</p>
            </div>
            <button className="text-uds-primary hover:text-uds-secondary">
              Изменить
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Дата регистрации</p>
              <p className="text-sm text-gray-600">{user.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Настройки</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Уведомления</p>
              <p className="text-sm text-gray-600">
                Получать уведомления о новых бонусах
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={handleNotificationToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-uds-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-uds-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Темная тема</p>
              <p className="text-sm text-gray-600">
                Включить темную тему приложения
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-uds-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-uds-primary"></div>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
      >
        Выйти из аккаунта
      </button>
    </div>
  );
}

export default Profile; 